const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const reqLogger = async (message, logName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    // Log the error, including the location where it occurred
    console.error(`Error in reqLogger: ${err.message}`);
  }
};

const logger = (req, res, next) => {
  reqLogger(
    `${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  ).then(() => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
};

module.exports = { logger };
