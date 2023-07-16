const TimeoutError = require("./errors");

// 5 mins
const timeout = 5 * 60 * 1000;

function timeoutMiddleware(req, res, next) {
  const timeoutId = setTimeout(() => {
    next(new TimeoutError());
  }, timeout);

  res.on("finish", () => {
    clearTimeout(timeoutId);
  });

  next();
}

module.exports = timeoutMiddleware;
