const mongoose = require("mongoose");
const Joi = require("joi");

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true
  },
  schoolId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});

const Grade = mongoose.model("Grades", gradeSchema);

function validateGrade(grade) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(10)
      .required(),
    schoolId: Joi.objectId().required()
  };
  return Joi.validate(grade, schema);
}

module.exports = { gradeSchema, Grade, validateGrade };
