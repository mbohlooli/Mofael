const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { School, validateSchool } = require("../models/school");
const { Role } = require("../models/role");
const { Grade } = require("../models/grade");
const { validateUser } = require("../models/User");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const manager = require("../middleware/manager");

const router = express.Router();

router.get("/", [auth, manager], async (req, res) => {
  const manager = req.user;

  res.send(await School.find({ managerId: manager._id }));
});

router.post("/", [auth, manager], async (req, res) => {
  validate(validateSchool, req, res);

  let school = await School.findOne({ name: req.body.name });
  if (school) return res.status(400).send("مدرسه مورد نظر قبلا ثبت شده.");

  const manager = req.user;

  school = new School({
    ..._.pick(req.body, ["name", "city", "zone"]),
    managerId: manager._id
  });

  await school.save();
  res.send(JSON.stringify(school));
});

router.put("/:id", [auth, manager], async (req, res) => {
  validate(validateSchool, req, res);

  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  const manager = req.user;

  if (school.managerId != manager._id)
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  await school.update(_.pick(req.body, ["name", "city", "zone"]));

  res.send(await School.findById(req.params.id));
});

router.delete("/:id", [auth, manager], async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  const manager = req.user;

  if (school.managerId != manager._id)
    return res.status(403).send("شما اجازه حذف این مدرسه را ندارید.");

  await Grade.deleteMany({ schoolId: school._id });

  await school.delete();

  res.send("done");
});

router.post("/:id", [auth, manager], async (req, res) => {
  validate(validateUser, req, res);

  const manager = req.user;
  const school = await School.findById(req.params.id);
  if (school.managerId != manager._id)
    return res.status(403).send("شما اجازه ویرایش این مدرسه را ندارید.");

  let user = await user.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر درحال حاضر وجود دارد.");

  const roles = await Role.find({ name: "مدیر آموزش" });
  user = new User({
    ..._.pick(req.body, ["username", "firstName", "lastName"]),
    roles,
    schoolId: req.params.id
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(JSON.stringify(user));
});

module.exports = router;
