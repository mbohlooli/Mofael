const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  degree: {
    type: Number,
    min: 1,
    max: 6,
    required: true
  },

  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  }
});

const Role = mongoose.model("Roles", roleSchema);

module.exports = { roleSchema, Role };
