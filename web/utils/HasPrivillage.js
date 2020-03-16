module.exports = function(user, degree) {
  for (let role of user.roles) {
    if (role.degree <= degree) return true;
  }

  return false;
};
