const logger = (req, res, next) => {
  console.log(`${Date.now()} Accessed ${req.url}`);
  next();
};

module.exports = logger;
