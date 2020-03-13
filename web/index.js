const express = require("express");
const app = express();
const winston = require("winston");

require("./startup/db")();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/checkKey")();
require("./startup/objectIdValidation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}`));
