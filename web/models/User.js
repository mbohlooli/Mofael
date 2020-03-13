const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true
  },
  firstName: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 35,
    required: true
  }
  // TODO: add roles (مدیر، مدیر آموزش، ادمین، دانش آموز، معلم، ...)
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "username", "firstName", "lastName"]),
    config.get("jwtPrivateKey"),
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("Users", userSchema);

module.exports = { User };
