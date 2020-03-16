const { School } = require("../../models/school");
const hasPrivillage = require("../HasPrivillage");

module.exports = async function(req) {
  const user = req.user;

  if (hasPrivillage(user, 2)) {
    return await School.find({ managerId: user._id });
  } else {
    return await School.findById(user.schoolId);
  }
};
