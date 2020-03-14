const mongoose = require("mongoose");
const Joi = require("joi");
const { gradeSchema } = require("./grade");

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
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
      .max(30)
      .required(),
    gradeId: Joi.objectId().required()
  };

  return Joi.validate(classroom, schema);
}

module.exports = { classroomSchema, Classroom, validateClassroom };
