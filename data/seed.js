const tmdb = require('../services/tmdb');
const db = require('./db');

const seed = () => {
  if (
    !db.has('movies').value() ||
    db
      .get('movies')
      .size()
      .value() === 0
  ) {
    tmdb.seedMovies();
  }

  if (
    !db.has('genres').value() ||
    db
      .get('genres')
      .size()
      .value() === 0
  ) {
    tmdb.seedGenres();
  }
};

module.exports = seed;
