const mongoose = require('mongoose');

const {
 DB_USER, DB_KEY, DB_SCHEME, DB_HOST, DB_NAME 
} = process.env;

mongoose.set('debug', false);

mongoose.connect(`${DB_SCHEME}${DB_HOST}${DB_NAME}`, {
  user: DB_USER,
  pass: DB_KEY,
  appname: 'YaMovie Server',

  keepAlive: true,
  retryWrites: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  promiseLibrary: Promise,
});

mongoose.connection.on('connecting', () =>
  console.log(`Server connecting to ${DB_NAME} database.`),
);

mongoose.connection.on('connected', () =>
  console.log(`Server connected to ${DB_NAME} database.`),
);

mongoose.connection.on('reconnected', () =>
  console.log(`Server reconnected to ${DB_NAME} database.`),
);

mongoose.connection.on('disconnecting', () =>
  console.log(`Server disconnecting from ${DB_NAME} database.`),
);

mongoose.connection.on('disconnected', () =>
  console.log(`Server disconnected from ${DB_NAME} database.`),
);

/**
 * Models
 */
module.exports.Genre = require('./genre');
module.exports.Movie = require('./movie');
module.exports.Provider = require('./provider');
module.exports.User = require('./user');
// module.exports.Genre = require('./jw-genre');
// module.exports.Movie = require('./jw-movies');
