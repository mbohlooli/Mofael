const express = require("express");
const { User, validateUser } = require("../models/user");
const { Role } = require("../models/role");
const _ = require("lodash");
const validate = require("../utils/validateRequest");
const generatePassword = require("../utils/User/GeneratePassword");

const router = express.Router();

router.post("/register", async (req, res) => {
  validate(validateUser, req, res);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر در حال حاضر وجود دارد.");

  const managerRole = await Role.findOne({ name: "مدیر" });
  user = new User({
    ..._.pick(req.body, ["username", "firstName", "lastName"]),
    roles: [managerRole]
  });

  user.password = await generatePassword(req.body.password);

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(JSON.stringify(user));
});

module.exports = router;
