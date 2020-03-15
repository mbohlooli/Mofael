const express = require("express");
const _ = require("lodash");
const { Grade, validateGrade } = require("../models/grade");
const { School } = require("../models/school");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const manager = require("../middleware/manager");

const router = express.Router();

//NOTE: think more about the middlewares of this route
router.get("/", [auth, manager], async (req, res) => {
  const manager = req.user;

  const schools = await School.find({ managerId: manager._id });

  let grades = [];
  for (let school of schools)
    grades.push(await Grade.find({ schoolId: school._id }));

  res.send(grades);
});

router.post("/", [auth, manager], async (req, res) => {
  validate(validateGrade, req, res);

  const school = await School.findById(req.body.schoolId);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  const manager = req.user;
  if (school.managerId != manager._id)
    return res.status(403).send("شما اجزاه ویرایش این مدرسه را ندارید.");

  let grade = await Grade.findOne({
    schoolId: school._id,
    name: req.body.name
  });
  if (grade) return res.status(400).send("این پایه قبلا ثبت شده.");

  grade = new Grade(_.pick(req.body, ["name", "schoolId"]));
  await grade.save();

  res.send(grade);
});

//NOTE: Does this route need a request body validation function?
router.put("/:id", [auth, manager], async (req, res) => {
  const grade = await Grade.findById(req.params.id);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const manager = req.user;
  const school = await School.findById(grade.schoolId);
  if (school.managerId != manager._id)
    return res.status(403).send("شما اجازه ویرایش این پایه را ندارید.");

  await grade.update(_.pick(req.body, ["name"]));

  res.send(await Grade.findById(req.params.id));
});

router.delete("/:id", [auth, manager], async (req, res) => {
  const grade = await Grade.findById(req.params.id);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const manager = req.user;
  const school = await School.findById(grade.schoolId);
  if (school.managerId != manager._id)
    return res.status(403).send("شما اجازه حذف این پایه را ندارید.");

  await grade.delete();

  res.send("done");
});

module.exports = router;
