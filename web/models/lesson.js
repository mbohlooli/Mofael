const mongoose = require("mongoose");
const Joi = require("joi");

const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gradeId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  multiplier: {
    type: Number,
    required: true
  }
});

const Lesson = mongoose.model("Lessons", lessonSchema);

function validateLesson(lesson) {
  const schema = {
    name: Joi.String().required(),
    gradeId: Joi.objectId().required(),
    multiplier: Joi.number().required()
  };
  return Joi.validate(lesson, schema);
}

module.exports = { Lesson, validateLesson };
