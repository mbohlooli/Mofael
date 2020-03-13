const express = require("express");
const _ = require("lodash");
const { School, validateSchool } = require("../models/school");
const { validate } = require("../utils/validateRequest");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const manager = req.user;

  res.send(await School.find({ managerId: manager._id }));
});

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

router.put("/:id", auth, async (req, res) => {
  validate(validateSchool, req, res);

  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  const manager = req.user;

  if (school.managerId != manager._id)
    return res.status(401).send("شما اجازه ویرایش این مدرسه را ندارید.");

  await school.update(_.pick(req.body, ["name", "city", "zone"]));

  res.send(await School.findById(req.params.id));
});

router.delete("/:id", auth, async (req, res) => {
  const school = await School.findById(req.params.id);
  if (!school) return res.status(404).send("مدرسه مورد نظر یافت نشد.");

  const manager = req.user;

  if (school.managerId != manager._id)
    return res.status(401).send("شما اجازه حذف این مدرسه را ندارید.");

  await school.delete();

  res.send("done");
});

module.exports = router;
