const { Role } = require("../models/role");

module.exports.initDB = async function() {
  const roles = await Role.find();
  if (roles.length == 6) return;

  const initalRoles = [
    "ادمین",
    "مدیر",
    "مدیر آموزش",
    "معلم",
    "مسئول انظباط",
    "دانش آموز"
  ];

  for (i = 0; i < initalRoles.length; i++) {
    let role = new Role({ degree: i + 1, name: initalRoles[i] });
    await role.save();
  }
};
