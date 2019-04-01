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

const seed = async () => {
  console.log('Seeding...');

  await seedGenres();

  while (state.movies.hasMore) {
    await new Promise(resolve => setTimeout(resolve, 15000));

    await seedMovies();
  }

  // let timer = await setTimeout(async () => {
  //   console.log('timing...');
  //   await seedMovies;
  //   if (state.movies.hasMore) timer = await setTimeout(seedMovies, 10000);
  //   else clearTimeout(timer);
  // }, 1000);

  // await seedMovies();
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

  for await (let datum of data) {
    await controllers.movie.create(await parser.movie(datum, movieConfigs));
    console.log(`Parsing ${datum.title}`);
    // await parser.movie(datum, movieConfigs);
  }

  await console.log('Movies seeded.');
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

module.exports = seed;
