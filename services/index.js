const axios = require('axios');
const jw = require('./jw');
const tmdb = require('./tmdb');
const omdb = require('./omdb');

const { SEED_SOURCE: source } = process.env;

const jw_getMoviesData = async movies => {
  const requests = movies.map(movie => jw.requestData(movie.id));
  const responses = await axios.all(requests);
  const data = responses.map(res => res.data);
  return data;
};

const tmdb_getMoviesData = async movies => {
  const tmdbRequests = movies.map(movie => tmdb.requestMovieDetails(movie.id));
  const tmdbResponses = await axios.all(tmdbRequests);

  const data = tmdbResponses.map(response => response.data);

  const supplements = data.map(datum => {
    return new Promise(async () => {
      datum.external_ids.tmdb_id = datum.id;
      if (datum.external_ids.imdb_id) {
        const omdbResponse = await omdb.requestMovieDetails(
          datum.external_ids.imdb_id,
        );
        datum.ratings = omdbResponse.data.Ratings;
      }
    });
  });

  return Promise.all(supplements);
};

const jw_getMovies = async page => {
  const { data } = await jw.requestMovies(page);
  data.results = data.items;
  return data;
};

const tmdb_getConfigurations = async () =>
  (await tmdb.requestConfigurations()).data;

const tmdb_getMovies = async page =>
  (await tmdb.requestDiscoverMovies(page)).data;

const jw_getGenres = async () => (await jw.requestGenres()).data;

const tmdb_getGenres = async () => (await tmdb.requestGenres()).data;

const jw_getProviders = async () => (await jw.requestProviders()).data;

const getProviders = async () => {
  switch (source) {
  case 'jw':
    return jw_getProviders();
  default:
    console.log(`Invalid provider source: ${source}`);
    return [];
  }
};

const getGenres = async () => {
  switch (source) {
  case 'jw':
    return jw_getGenres();
  case 'tmdb':
    return tmdb_getGenres().genres;
  default:
    console.log(`Invalid genre source: ${source}`);
    return [];
  }
};

const getConfigurations = async () => {
  switch (source) {
  case 'tmdb':
    return tmdb_getConfigurations();
  default:
    console.log(`Invalid configuration source: ${source}`);
    return {};
  }
};

const getMovies = async page => {
  switch (source) {
  case 'jw':
    return jw_getMovies(page);
  case 'tmdb':
    return tmdb_getMovies(page);
  default:
    console.log(`Invalid movie source: ${source}`);
    return {};
  }
};

const getMovieData = async movies => {
  switch (source) {
  case 'jw':
    return jw_getMoviesData(movies);
  case 'tmdb':
    return tmdb_getMoviesData(movies);
  default:
    console.log(`Invalid movie data source: ${source}`);
    return [];
  }
};

module.exports = {
  getProviders,
  getGenres,
  getConfigurations,
  getMovies,
  getMovieData,
};
