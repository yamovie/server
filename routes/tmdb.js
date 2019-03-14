const request = require('request');
const db = require('../data/db');
const options = require('./tmdb-options');
const parser = require('./tmdb-parser');

let tmdb = {};

tmdb.seedMovies = () => {
  console.log('Seeding movies...');
  request(options.init, (err, res, body) => {
    if (err) throw new Error(err);

    // Seed 20 movies
    body.results.forEach(movie => {
      const newMovie = parser.movie(movie);

      db.get('movies')
        .push(newMovie)
        .write();
    });
  });
};

tmdb.seedGenres = () => {
  console.log('Seeding genres...');
  request(options.genres, (err, res, body) => {
    if (err) throw new Error(err);

    body.genres.forEach(genre => {
      db.get('genres')
        .push(genre)
        .write();
    });
  });
};

module.exports = tmdb;
