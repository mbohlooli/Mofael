const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");
const { initDB } = require("../utils/InitializeDB");

module.exports = function() {
  const db = config.get("db");

  mongoose
    .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => winston.info("connected to database"));

  initDB();
};
