const express = require("express");
const users = require("../routes/users");
const error = require("../middleware/error");
const cors = require("cors");

module.exports = function(app) {
  app.use(express.json());
  app.use("/users", users);
  app.use(cors);
  app.use(error);
};
