module.exports = function(req, res, next) {
  const user = req.user;

  for (let role of user.roles) {
    if (role.degree == 6) return true;
  }

  return false;
};
