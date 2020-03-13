const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/db")();
require("./startup/logging")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}`));
