const winston = require("winston");

module.exports = function(err, req, res, next) {
  winston.error(err.message, err);
  console.error(err);

  res.status(500).send("خطای سرور.");
};
