const mongoose = require('mongoose');

const options = {
  user: process.env.DB_USER,
  pass: process.env.DB_KEY,
  appname: 'YaMovie Server',

  keepAlive: true,
  retryWrites: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  promiseLibrary: Promise,
};

mongoose.set('debug', true);
mongoose.set('objectIdGetter', true);

mongoose.connect(
  `${process.env.DB_SCHEME}${process.env.DB_HOST}${process.env.DB_NAME}`,
  options,
);

mongoose.connection.on('connected', () =>
  console.log(`Connected to ${process.env.DB_NAME}`),
);

mongoose.connection.on('disconnected', () =>
  console.log(`Disconnected from ${process.env.DB_NAME}`),
);

module.exports.Movie = require('./movie');
module.exports.Genre = require('./genre');
