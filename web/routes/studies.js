const express = require("express");
const _ = require("lodash");
const { Study, validateStudy } = require("../models/study");
const { Lesson } = require("../models/lesson");
const { Classroom } = require("../models/classroom");
const validate = require("../utils/validateRequest");
const auth = require("../middleware/auth");
const student = require("../middleware/student");

const router = express.Router();

router.post("/", [auth, student], async (req, res) => {
  validate(validateStudy, req.body);

  const classroom = await Classroom.findById(req.user.classroomId);

  const lesson = await Lesson.find({
    _id: req.body.lessonId,
    gradeId: classroom.grade._id
  });
  if (!lesson) return res.stauts(404).send("درس مورد نظر یافت نشد");

  let study = await Study.find({ studentId: req.user._id });
  if (study) {
    //NOTE: Student can just modify the current week no future and past weeks
    const duplicateStudyHour = _.find(study.studyHours, [
      "weekIndex",
      req.body.weekIndex
    ]);
    if (duplicateStudyHour) {
      const index = study.studyHours.indexOf(duplicateStudyHour);
      study.studyHours[index] = _.pick(req.body, ["lessonId", "value"]);
    } else {
      study.studyHours.push(
        _.pick(req.body, ["weekIndex", "lessonId", "value"])
      );
    }
  } else {
    study = new Study({
      ..._.pick(req.body, ["weekIndex", "lessonId", "value"]),
      studentId: req.user._id
    });
  }

  await study.save();

  res.send(study);
});

module.exports = router;
