const express = require("express");
const _ = require("lodash");
const { Grade, validateGrade } = require("../models/grade");
const { School } = require("../models/school");
const { Classroom } = require("../models/classroom");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const educationalDirector = require("../middleware/educationalDirector");
const verifySchoolAccess = require("../utils/School/AuthorizeSchool");

const router = express.Router();

//NOTE: think more about the middlewares of this route
router.get("/", [auth, educationalDirector], async (req, res) => {
  const manager = req.user;

  const schools = await School.find({ managerId: manager._id });

  let grades = [];
  for (let school of schools)
    grades.push(await Grade.find({ schoolId: school._id }));

  res.send(grades);
});

router.post("/", [auth, educationalDirector], async (req, res) => {
  validate(validateGrade, req, res);

  const school = await School.findById(req.body.schoolId);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  let grade = await Grade.findOne({
    schoolId: school._id,
    name: req.body.name
  });
  if (grade) return res.status(400).send("این پایه قبلا ثبت شده.");

  grade = new Grade(_.pick(req.body, ["name", "schoolId"]));
  await grade.save();

  res.send(grade);
});

router.put("/:id", [auth, educationalDirector], async (req, res) => {
  validate(validateGrade, req, res);

  const grade = await Grade.findById(req.params.id);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  let school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این پایه را ندارید.");

  if (req.body.schoolId) {
    school = await School.findById(req.body.schoolId);
    if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

    if (!(await verifySchoolAccess(school, req)))
      return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");
  }

  const duplicateGrade = await Grade.findOne({
    schoolId: school._id,
    name: req.body.name
  });
  if (duplicateGrade)
    return res.status(400).send("پایه مورد نظر قبلا ثبت شده.");

  await grade.update(_.pick(req.body, ["name", "schoolId"]));

  res.send(await Grade.findById(req.params.id));
});

router.delete("/:id", [auth, educationalDirector], async (req, res) => {
  const grade = await Grade.findById(req.params.id);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه حذف این پایه را ندارید.");

  await Classroom.deleteMany({ grade });
  await grade.delete();

  res.send("done");
});

module.exports = router;
