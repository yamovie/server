const controllers = require('../controllers');
const { Movie, Genre } = require('../models/');
const services = require('../services');
const parser = require('./parser');

module.exports = seed = () => {
  console.log('Seeding...');

  // Seed genres
  Genre.find({})
    .exec()
    .then(async allGenres => {
      if (allGenres.length === 0) {
        console.log('Seeding genres...');

        const results = await services.getGenres();
        results.genres.forEach(genre => {
          controllers.genre.create(parser.genres(genre));
        });

        console.log('Genres seeded.');
      }
    })
    .catch(error => console.log(error.stack));

  // Seed movies
  Movie.find({})
    .exec()
    .then(async allMovies => {
      if (allMovies.length === 0) {
        console.log('Seeding movies...');

        const movies = await services.getMovies();
        const results = await services.getMovieData(movies.results);

        for await (let movieDatum of results.movieData) {
          controllers.movie.create(
            await parser.movie(movieDatum, results.configData),
          );
        }

        console.log('Movies seeded.');
      }
    })
    .catch(error => console.log(error.stack));
};
