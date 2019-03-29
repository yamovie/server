const services = require('../services');
const { Movie, Genre, DetailedMovie } = require('../models/');
const controllers = require('../controllers');
const parser = require('./parser');

module.exports = () => {
  console.log('Preparing to seed...');

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

  DetailedMovie.find({})
    .exec()
    .then(async allMovies => {
      if (allMovies.length === 0) {
        console.log('Seeding movies...');
        const results = await services.getDetailedMovies();

        for await (let datum of results.data) {
          controllers.movie.createDetailed(
            await parser.detailedMovie(datum, results.config),
          );
          // console.log(await parser.detailedMovie(datum, results.config));
        }

        console.log('Movies seeded.');
      }
    })
    .catch(error => console.log(error.stack));
};
