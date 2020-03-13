const express = require("express");
const _ = require("lodash");
const { School, validateSchool } = require("../models/school");
const { validate } = require("../utils/validateRequest");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
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

module.exports = router;
