const services = require('../services');
const { Movie, Genre } = require('../models');
const controllers = require('../controllers');
const parser = require('./parser');

module.exports = () => {
  // Seed movies
  Movie.find({})
    .exec()
    .then(async allMovies => {
      if (allMovies.length === 0) {
        console.log('Seeding movies...');
        const movies = await services.getMovies();
        movies.results.forEach(movie => {
          controllers.movie.create(parser.movies(movie));
        });
        console.log('Movies seeded.');
      }
    })
    .catch(error => console.log(error.stack));

  // Seed genres
  Genre.find({})
    .exec()
    .then(async allGenres => {
      if (allGenres.length === 0) {
        console.log('Seeding genres...');
        const data = await services.getGenres();
        data.genres.forEach(genre => {
          controllers.genre.create(parser.genres(genre));
        });
        console.log('Genres seeded.');
      }
    })
    .catch(error => console.log(error.stack));
};
