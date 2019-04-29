module.exports = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Oops! Something went wrong',
    },
  });

  next();
};
