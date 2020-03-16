const hasPrivillage = require("../User/HasPrivillage");

module.exports = async function(school, req) {
  const user = req.user;

  if (hasPrivillage(user, 1)) return true;
  else if (hasPrivillage(user, 2)) return school.managerId == user._id;
  else if (hasPrivillage(user, 3)) return school._id == user.schoolId;

  return false;
};
