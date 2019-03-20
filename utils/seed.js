const tmdb = require('../services/tmdb');
const db = require('../models');
const controllers = require('../controllers');
const parser = require('./parser');

module.exports = seed = () => {
  // Seed movies
  db.Movie.find({}, async (err, allMovies) => {
    if (err) throw new Error(err);
    else if (allMovies.length === 0) {
      console.log('Seeding movies...');
      const movies = await tmdb.discoverMovies();
      movies.results.forEach(movie => {
        controllers.movie.create(parser.list(movie));
      });
    } else console.log('Movies exists...');
  });

  // Seed genres
  db.Genre.find({}, async (err, allGenres) => {
    if (err) throw new Error(err);
    else if (allGenres.length === 0) {
      console.log('Seeding genres...');
      const genres = await tmdb.getGenres();
      genres.results.forEach(genre => {
        controllers.genre.create(parser.genre(genre));
      });
    } else console.log('Genres exists...');
  });
};
