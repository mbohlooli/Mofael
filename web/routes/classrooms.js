const express = require("express");
const _ = require("lodash");
const { Classroom, validateClassroom } = require("../models/classroom");
const { Grade } = require("../models/grade");
const { School } = require("../models/school");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const educationalDirector = require("../middleware/educationalDirector");
const verifySchoolAccess = require("../utils/School/AuthorizeSchool");

const router = express.Router();
router.get("/:gradeId", [auth, educationalDirector], async (req, res) => {
  const grade = await Grade.findById(req.params.gradeId);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  res.send(await Classroom.find({ grade }));
});

router.post("/", [auth, educationalDirector], async (req, res) => {
  validate(validateClassroom, req, res);

  const grade = await Grade.findById(req.body.gradeId);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  //TODO: change this kind of validation to work with teachers and educational directors
  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  let classroom = await Classroom.findOne({
    grade: grade,
    name: req.body.name
  });
  if (classroom) return res.status(400).send("کلاس مورد نظر قبلا ثبت شده.");

  classroom = new Classroom({ ..._.pick(req.body, ["name"]), grade });
  await classroom.save();

  res.send(classroom);
});

router.put("/:id", [auth, educationalDirector], async (req, res) => {
  validate(validateClassroom, req, res);

  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) return res.status(404).send("کلاس مورد نظر یافت نشد.");

  const school = await School.findById(classroom.grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این کلاس را ندارید.");

  let grade = classroom.grade;
  if (req.body.gradeId) {
    grade = await Grade.findById(req.body.gradeId);
    if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

    const school = await School.findById(grade.schoolId);
    if (!(await verifySchoolAccess(school, req)))
      return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");
  }
  const duplicateClassroom = await Classroom.findOne({
    grade,
    name: req.body.name
  });
  if (duplicateClassroom)
    return res.status(400).send("کلاس مورد نظر قبلا ثبت شده.");

  await classroom.update({ ..._.pick(req.body, ["name"]), grade });

  res.send(await Classroom.findById(req.params.id));
});

router.delete("/:id", [auth, educationalDirector], async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) return res.status(404).send("کلاس مورد نظر یافت نشد.");

  const school = await School.findById(classroom.grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  await classroom.delete();

  res.send("done");
});

module.exports = router;
