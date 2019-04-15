/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const controllers = require('../controllers');
const services = require('../services');
const configs = require('../configs');
const { transformers } = require('../utils/');

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

const jw_seedMovies = async () => {
  console.log('Movies seeding...');

  const seed = await services.jw_getMovies();
  const data = await services.jw_getMoviesData(seed.items);
  const movies = await Promise.all(data.map(movie => transformers.jw.movie(movie)));

  await controllers.movie.insertMany(movies);

  console.log('Movies seeded.');
};

const seedMovies = async () => {
  await console.log('Seeding movies...');

  const config = Object.assign({}, configs.urls, await services.getConfigurations());

  const seed = await services.getMovies(state.movies.page + 1);

  setMovieState(seed.page, seed.results.length, seed.total_pages, seed.total_results);

  const data = await services.getMoviesData(seed.results);
  const movies = await Promise.all(
    data.map(movie => transformers.tmdb.movie(movie, config)),
  );

  controllers.movie.insertMany(movies);

  await console.log('Movies seeded.');
};

const seedGenres = async () => {
  console.log('Genres seeding...');

  if ((await controllers.genre.count()) === 0) {
    const seed = (await services.getGenres()).genres;

    const genres = await Promise.all(seed.map(genre => transformers.tmdb.genre(genre)));

    await controllers.genre.insertMany(genres);
  }

  console.log('Genres seeded.');
};

const seedProviders = async () => {
  console.log('Providers seeding...');

  const seed = await services.getProviders();
  const providers = await Promise.all(
    seed.map(provider => transformers.jw.provider(provider)),
  );

  await controllers.provider.insertMany(providers);

  console.log('Providers seeded.');
};

const jw_seedGenres = async () => {
  console.log('Genres seeding...');

  const seed = await services.jw_getGenres();
  const genres = await Promise.all(seed.map(genre => transformers.jw.genre(genre)));

  await controllers.genre.insertMany(genres);

  console.log('Genres seeded.');
};

const seed = async () => {
  console.log('Seeding...');

  // await seedProviders();
  // await seedGenres();
  // await seedMovies();
  // await jw_seedGenres();
  // await jw_seedMovies();

  while (state.movies.hasMore) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    await seedMovies();
  }

  console.log('Seeding completed.');
};

module.exports = seed;
