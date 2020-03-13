const express = require("express");
const _ = require("lodash");
const { School, validateSchool } = require("../models/school");
const { User } = require("../models/user");
const { validate } = require("../utils/validateRequest");

const router = express.Router();

//TODO: add authentication middleware
router.post("/", async (req, res) => {
  validate(validateSchool, req, res);

  const manager = await User.findById(req.body.managerId);
  if (!manager) return res.status(404).send("کاربر مورد نظر یافت نشد.");

  let school = await School.findOne({ name: req.body.name });
  if (school) return res.status(400).send("مدرسه مورد نظر قبلا ثبت شده.");

  school = new School(_.pick(req.body, ["name", "city", "zone", "managerId"]));

  await school.save();
  res.send(JSON.stringify(school));
});

module.exports = router;
