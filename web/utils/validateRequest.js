module.exports.validate = function(validationFunction, req, res) {
  const { error } = validationFunction(req.body);
  if (error) return res.status(400).send(error.details[0].message);
};
