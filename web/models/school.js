const mongoose = require("mongoose");
const Joi = require("joi");

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    unique: true,
    required: true
  },
  city: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  zone: {
    type: Number,
    required: true
  },
  managerId: {
    type: mongoose.Types.ObjectId
  }
});

const School = mongoose.model("Schools", schoolSchema);

function validateSchool(school) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    city: Joi.string()
      .min(3)
      .max(30)
      .required(),
    zone: Joi.number().required()
  };

  return Joi.validate(school, schema);
}

module.exports = { School, validateSchool };
