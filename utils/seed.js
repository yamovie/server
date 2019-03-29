const controllers = require('../controllers');
const services = require('../services');
const { parser, configs } = require('../utils');

const seed = async () => {
  console.log('Seeding...');

  await seedGenres();
  await seedMovies();

  console.log('Seeding completed.');
};

const seedGenres = async () => {
  const allGenres = await controllers.genre.readAll();
  if (!allGenres || allGenres.length === 0) {
    await console.log('Seeding genres...');

    const seed = await services.getGenres();

    for await (let genre of seed.genres) {
      await controllers.genre.create(await parser.genres(genre));
    }

    await console.log('Genres seeded.');
  }
};

const seedMovies = async () => {
  const allMovies = await controllers.movie.readAll();
  if (!allMovies || allMovies.length === 0) {
    await console.log('Seeding movies...');

    const movieConfigs = Object.assign(
      await services.updateConfigurations(),
      configs.movies,
    );

    const seed = await services.getMovies();
    const data = await services.getMoviesData(seed.results);

    for await (let datum of data) {
      await controllers.movie.create(await parser.movie(datum, movieConfigs));
    }

    await console.log('Movies seeded.');
  }
};

module.exports = seed;
