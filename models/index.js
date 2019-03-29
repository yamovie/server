const mongoose = require('mongoose');

const uri = `${process.env.DB_PREFIX}${process.env.DB_USER}:${
  process.env.DB_KEY
}${process.env.DB_HOSTNAME}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

const connectOptions = {
  keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  promiseLibrary: Promise,
};

mongoose.set('debug', true);
mongoose.set('objectIdGetter', true);
mongoose.connect(uri, connectOptions).catch(error => {
  throw new Error(error);
});

module.exports.Movie = require('./movie');
module.exports.Genre = require('./genre');
