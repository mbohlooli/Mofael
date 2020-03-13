const mongoose = require("mongoose");

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

const User = mongoose.model("Users", userSchema);

module.exports = { User };
