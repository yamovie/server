/* eslint-disable no-console */

const controllers = require('../controllers');
const services = require('../services');
const { parser, configs } = require('../utils');

const state = {
  movies: {
    page: 0,
    results: 0,
    totalPages: 0,
    totalResults: 0,
    updatedAt: '',
    hasMore: true,
  },
};

const setMovieState = (page, results, totalPages, totalResults) => {
  state.movies = {
    page,
    results: state.movies.results + results,
    totalPages,
    totalResults,
    updatedAt: new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    }),
    hasMore: page < totalPages,
  };

  console.info(state.movies);
};

const seedGenres = async () => {
  const allGenres = await controllers.genre.readAll();
  if (!allGenres || allGenres.length === 0) {
    await console.log('Seeding genres...');

    const seed = await services.getGenres();

    for await (const genre of seed.genres) {
      controllers.genre.create(await parser.genres(genre));
    }

    await console.log('Genres seeded.');
  }
};

const seedCertifications = async () => {
  const seed = await services.getCertifications();
  const data = seed.certifications.US;
};

const seedMovies = async () => {
  await console.log('Seeding movies...');

  const seed = await services.getMovies();
  const data = await services.getMoviesData(seed.items);
  const parsed = [];
  for await (const datum of data) {
    console.log(`Parsing ${datum.title}`);
    parsed.push(await parser.jw(datum));
  }
  console.log(parsed[0]);
};

const _seedMovies = async () => {
  await console.log('Seeding movies...');

  const movieConfigs = Object.assign(
    await services.updateConfigurations(),
    configs.movies,
  );

  const seed = await services.getMovies(state.movies.page + 1);
  setMovieState(
    seed.page,
    seed.results.length,
    seed.total_pages,
    seed.total_results,
  );
  const data = await services.getMoviesData(seed.results);

  for await (const datum of data) {
    controllers.movie.create(await parser.movie(datum, movieConfigs));
    console.log(`Parsing ${datum.title}`);
  }

  await console.log('Movies seeded.');
};

const seed = async () => {
  console.log('Seeding...');

  await seedGenres();

  await seedMovies();

  // while (state.movies.hasMore) {
  //   await new Promise(resolve => setTimeout(resolve, 10000));

  //   await seedMovies();
  // }
};

module.exports = seed;
