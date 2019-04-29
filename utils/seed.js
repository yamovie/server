const controllers = require('../controllers');
const services = require('../services');
const configs = require('../configs');
const { transformers } = require('../utils/');

let state = {
  page: 1,
  results: 0,
  total_pages: 0,
  total_results: 0,
  updatedAt: '',
  hasMore: true,
};

const setState = seed => {
  state = {
    page: state.page + 1,
    results: state.results + seed.results.length,
    total_pages: seed.total_pages,
    total_results: seed.total_results,
    updatedAt: new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
    }),
    hasMore: state.page + 1 < seed.total_pages,
  };
};

const seedMovies = async () => {
  console.log('Movies seeding...');

  console.log(state);

  const config = Object.assign(configs, await services.getConfigurations());

  const seed = await services.getMovies(state.page);
  await setState(seed);

  const data = await services.getMovieData(seed.results);
  const movies = await Promise.all(
    data.map(movie => transformers.movie(movie, config)),
  );

  await controllers.movie.insertMany(movies);

  console.log('Movies seeded.');
};

const seedGenres = async () => {
  console.log('Genres seeding...');

  const seed = await services.getGenres();
  const genres = await Promise.all(
    seed.map(genre => transformers.genre(genre)),
  );
  await controllers.genre.insertMany(genres);

  console.log('Genres seeded.');
};

const seedProviders = async () => {
  console.log('Providers seeding...');

  const seed = await services.getProviders();
  const providers = await Promise.all(
    seed.map(provider => transformers.provider(provider)),
  );
  await controllers.provider.insertMany(providers);

  console.log('Providers seeded.');
};

const seed = async () => {
  const { SEED_AUTOMATE, SEED_INTERVAL } = process.env;

  console.log('Seeding...');

  try {
    await Promise.all([seedProviders(), seedGenres()]);
  } catch (MongoError) {
    console.log('MongoError');
  }

  do {
    await new Promise(resolve => setTimeout(resolve, SEED_INTERVAL));

    await seedMovies();
  } while (SEED_AUTOMATE === 'true' && state.hasMore);
};

module.exports = seed;
