const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const validate = require("../utils/validateRequest");

const router = express.Router();

router.post("/login", async (req, res) => {
  validate(validateAuthRequest, req, res);

  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("نام کاربری یا رمز عبور اشتباه است.");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send("نام کاربری یا رمز عبور اشتباه است.");

  const token = user.generateAuthToken();
  res.send(JSON.stringify(token));
});

module.exports = router;

function validateAuthRequest(req) {
  const schema = {
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
  };

  return Joi.validate(req, schema);
}
