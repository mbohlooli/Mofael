const mongoose = require("mongoose");
const Joi = require("joi");
const { gradeSchema } = require("./grade");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  grade: {
    type: gradeSchema,
    required: true
  }
});

const Classroom = mongoose.model("Clasrooms", classroomSchema);

function validateClassroom(classroom) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    grade: Joi.objectId().required()
  };

  return Joi.validate(classroom, schema);
}

module.exports = { classroomSchema, Classroom, validateClassroom };
