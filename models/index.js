const mongoose = require('mongoose');

const {
  DB_VERBOSE,
  DB_USER,
  DB_KEY,
  DB_SCHEME,
  DB_HOST,
  DB_NAME,
  SEED_SOURCE,
} = process.env;

mongoose.set('debug', DB_VERBOSE === 'true');

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

// module.exports.TMDBGenre = require('./tmdb-genre');
// module.exports.TMDBMovie = require('./tmdb-movie');

// module.exports.JWProvider = require('./jw-provider');
// module.exports.JWGenre = require('./jw-genre');
// module.exports.JWMovie = require('./jw-movie');
module.exports.Provider = require('./jw-provider');

module.exports.Genre = require(`./${SEED_SOURCE}-genre`);
module.exports.Movie = require(`./${SEED_SOURCE}-movie`);

module.exports.User = require('./user');
module.exports.Preference = require('./preference');
