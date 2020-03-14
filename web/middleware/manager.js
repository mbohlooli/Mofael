module.exports = function(req, res, next) {
  const user = req.user;
  for (let role of user.roles) {
    if (role.degree <= 2) {
      next();
      return;
    }
  }

  res.status(403).send("Forbidden.");
};
