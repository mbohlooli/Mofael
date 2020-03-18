const mongoose = require("mongoose");
const Joi = require("joi");

const studySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  studyHours: {
    type: [
      {
        date: String,
        weekIndex: Number,
        lessonId: mongoose.Types.ObjectId,
        value: Number
      }
    ],
    required: true
  }
});

const Study = mongoose.model("Studies", studySchema);

function validateStudy(study) {
  const schema = {
    studentId: Joi.objectId().required(),
    date: Joi.string().required(),
    weekIndex: Joi.number().required(),
    lessonId: Joi.objectId().required(),
    value: Joi.number().required()
  };

  return Joi.validate(study, schema);
}

module.exports = { Study, validateStudy };
