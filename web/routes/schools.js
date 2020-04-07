const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { School, validateSchool } = require("../models/school");
const { Role } = require("../models/role");
const { Grade } = require("../models/grade");
const { User, validateUser } = require("../models/user");
const { Classroom } = require("../models/classroom");

const getSchools = require("../utils/School/GetSchools");
const verifySchoolAccess = require("../utils/School/AuthorizeSchool");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const educationalDirector = require("../middleware/educationalDirector");
const manager = require("../middleware/manager");
const generatePassword = require("../utils/User/GeneratePassword");

const router = express.Router();

router.get("/", [auth, manager], async (req, res) => {
  res.send(await getSchools(req));
});

router.get("/:id", [auth, manager], async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");

  res.send(JSON.stringify(school));
});

router.get("/info/:id", [auth, manager], async (req, res) => {
  //TODO: complete the response of this route
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");

  const users = await User.find({ schoolId: req.params.id });

  res.send(JSON.stringify({ school, count: users.length }));
});

router.get("/count/:id", [auth, educationalDirector], async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه دسترسی به این مدرسه را ندارید.");
  const users = await User.find({ schoolId: req.params.id });

  res.send(JSON.stringify(users.length));
});

router.post("/", [auth, educationalDirector], async (req, res) => {
  validate(validateSchool, req, res);

  let school = await School.findOne({ name: req.body.name });
  if (school) return res.status(400).send("مدرسه مورد نظر قبلا ثبت شده.");

  const manager = req.user;

  school = new School({
    ..._.pick(req.body, ["name", "city", "zone"]),
    managerId: manager._id,
  });

  await school.save();
  res.send(JSON.stringify(school));
});

router.put("/:id", [auth, educationalDirector], async (req, res) => {
  validate(validateSchool, req, res);

  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  await school.update(_.pick(req.body, ["name", "city", "zone"]));

  res.send(await School.findById(req.params.id));
});

router.delete("/:id", [auth, manager], async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه حذف این مدرسه را ندارید.");

  const grades = await Grade.find({ schoolId: school._id });
  //TODO: make reusable functions for deleting school, grade & ...
  for (let grade of grades) {
    await Classroom.deleteMany({ grade });
    await grade.delete();
  }

  await school.delete();

  res.send(JSON.stringify("done"));
});

router.post("/:id", [auth, manager], async (req, res) => {
  validate(validateUser, req, res);

  const school = await School.findById(req.params.id);
  if (!(await verifySchoolAccess(school, req)))
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر درحال حاضر وجود دارد.");

  const roles = await Role.find({ name: "مدیر آموزش" });
  user = new User({
    ..._.pick(req.body, ["username", "firstName", "lastName"]),
    roles,
    schoolId: req.params.id,
  });

  user.password = await generatePassword(req.body.password);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(JSON.stringify(user));
});

router.delete("/", [auth, manager], async (req, res) => {
  const schools = await School.find({ managerId: req.user._id });

  for (let school of schools) {
    const grades = await Grade.find({ schoolId: school._id });

    for (let grade of grades) {
      await Classroom.deleteMany({ grade });
      await grade.delete();
    }

    await school.delete();
  }

  res.send(JSON.stringify("done"));
});

module.exports = router;
