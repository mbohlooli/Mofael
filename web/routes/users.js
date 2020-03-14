const express = require("express");
const { User, validateUser } = require("../models/user");
const { Role } = require("../models/role");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const validate = require("../utils/validateRequest");

const router = express.Router();

router.post("/register", async (req, res) => {
  validate(validateUser, req, res);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر در حال حاضر وجود دارد.");

  const managerRole = await Role.findOne({ name: "مدیر" });
  user = new User({
    ..._.pick(req.body, ["username", "password", "firstName", "lastName"]),
    roles: [managerRole]
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(JSON.stringify(user));
});

module.exports = router;
