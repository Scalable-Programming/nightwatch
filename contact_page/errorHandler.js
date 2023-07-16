const TimeoutError = require("./errors");
const wasResponseSent = require("./utils");

function handleError(error, req, res, next) {
  if (wasResponseSent(res)) {
    return;
  }

  let status = 400;

  if (error instanceof TimeoutError) {
    status = 408;
  }

  res.status(status).send();
}

module.exports = handleError;
