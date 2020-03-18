const express = require("express");
const _ = require("lodash");
const { Classroom, validateClassroom } = require("../models/classroom");
const { Grade } = require("../models/grade");
const { School } = require("../models/school");
const { User } = require("../models/user");
const { Role } = require("../models/role");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const educationalDirector = require("../middleware/educationalDirector");
const verifySchoolAccess = require("../utils/School/AuthorizeSchool");
const generatePassword = require("../utils/User/GeneratePassword");

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

router.post(
  "/addStudent/:id",
  [auth, educationalDirector],
  async (req, res) => {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).send("کلاس مورد نظر یافت نشد.");

    const school = await School.findById(classroom.grade.schoolId);
    if (!(await verifySchoolAccess(school, req, res)))
      return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");

    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("کاربر در حال حاضر وجود دارد.");

    const roles = await Role.find({ name: "دانش آموز" });
    user = new User({
      ..._.pick(req.body, ["username", "firstName", "lastName"]),
      roles,
      classroomId: req.params.id
    });

    user.password = await generatePassword(req.body.password);

    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send(JSON.stringify(user));
  }
);

module.exports = router;
