const express = require("express");
const _ = require("lodash");
const { Lesson, validateLesson } = require("../models/lesson");
const { Grade } = require("../models/grade");
const { School } = require("../models/school");
const { Classroom } = require("../models/classroom");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const educationalDirector = require("../middleware/educationalDirector");
const student = require("../middleware/student");
const verifySchoolAccess = require("../utils/School/AuthorizeSchool");

const router = express.Router();

router.get("/", [auth, student], async (req, res) => {
  const classroom = await Classroom.findById(req.user.classroomId);

  res.send(await Lesson.find({ gradeId: classroom.grade._id }));
});

router.get("/:id", [auth], async (req, res) => {
  const grade = await Grade.findById(req.params.id);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");

  res.send(await Lesson.find({ gradeId: grade._id }));
});

router.post("/", [auth, educationalDirector], async (req, res) => {
  validate(validateLesson, req, res);

  const grade = await Grade.findById(req.body.gradeId);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  let lesson = await Lesson.findOne(_.pick(req.body, ["name", "gradeId"]));
  if (lesson) return res.status(400).send("درس مورد نظر قبلا ثبت شده.");

  lesson = new Lesson(_.pick(req.body, ["name", "gradeId", "multiplier"]));

  await lesson.save();

  res.send(lesson);
});

router.put("/:id", [auth, educationalDirector], async (req, res) => {
  validate(validateLesson, req, res);

  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).send("درس مورد نظر یافت نشد.");

  const grade = await Grade.findById(req.body.gradeId);
  if (!grade) return res.status(404).send("پایه مورد نظر یافت نشد.");

  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  if (req.body.gradeId != lesson.gradeId) {
    const duplicateLesson = await Lesson.findOne(
      _.pick(req.body, ["name", "gradeId"])
    );
    if (duplicateLesson)
      return res.status(400).send("درس مورد نظر قبلا ثبت شده.");
  }

  await lesson.update(_.pick(req.body, ["name", "gradeId", "multiplier"]));

  res.send(await Lesson.findById(req.params.id));
});

router.delete("/:id", [auth, educationalDirector], async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return res.status(404).send("درس مورد نظر یافت نشد.");

  const grade = await Grade.findById(lesson.gradeId);
  const school = await School.findById(grade.schoolId);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");

  await lesson.delete();
  res.send("done");
});

module.exports = router;
