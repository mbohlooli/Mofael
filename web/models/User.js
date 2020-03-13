const mongoose = require("mongoose");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const { roleSchema } = require("./role");

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
  },
  roles: {
    type: [roleSchema],
    required: true
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    _.pick(this, ["_id", "username", "firstName", "lastName"]),
    config.get("jwtPrivateKey"),
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(8)
      .max(200)
      .required(),
    firstName: Joi.string()
      .min(3)
      .max(30)
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(35)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = { User, validateUser };
