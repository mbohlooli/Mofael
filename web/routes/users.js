const express = require("express");
const { User } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
  // TODO: add validation for the request body with Joi

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر در حال حاضر وجود دارد.");

  user = new User(
    _.pick(req.body, ["username", "password", "firstName", "lastName"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(JSON.stringify(user));
});

module.exports = router;
