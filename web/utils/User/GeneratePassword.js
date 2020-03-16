const bcrypt = require("bcrypt");

module.exports = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
