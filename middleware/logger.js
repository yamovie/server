/**
 * Logs requests
 */
const logger = (req, res, next) => {
  const timestamp = Date(Date.now()).toString();

  console.log(`${timestamp} ${req.headers.host} ${req.method} ${req.url}`);
  next();
};

module.exports = logger;
