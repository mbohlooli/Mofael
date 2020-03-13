const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  // TODO: add validation for the request body with Joi

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("کاربر در حال حاضر وجود دارد.");

  user = new User({
    //TODO: use lodash for picking valid fields here
    ...req.body
  });

  await user.save();
  res.send("done");
});

module.exports = router;
