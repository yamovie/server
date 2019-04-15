const axios = require('axios');
const jw = require('./jw');
const tmdb = require('./tmdb');
const omdb = require('./omdb');

const getConfigurations = async () => {
  const configResponse = await tmdb.requestConfigurations();
  return configResponse.data;
};

const getProviders = async () => (await jw.requestProviders()).data;

const jw_getGenres = async () => (await jw.requestGenres()).data;

const jw_getMovies = async page => (await jw.requestMovies(page)).data;

const getGenres = async () => (await tmdb.requestGenres()).data;

const jw_getMoviesData = async movies => {
  const requests = movies.map(movie => jw.requestData(movie.id));
  const responses = await axios.all(requests);
  const data = responses.map(res => res.data);
  return data;
};

const getCertifications = async page => {
  const certResponse = await tmdb.requestCertifications();
  return certResponse.data;
};

const getMovies = async page => {
  const response = await tmdb.requestDiscoverMovies(page);
  return response.data;
};

const getMoviesData = async movies => {
  const tmdbRequests = movies.map(movie => tmdb.requestMovieDetails(movie.id));
  const tmdbResponses = await axios.all(tmdbRequests);

  let movieData = tmdbResponses.map(response => response.data);

  for await (let datum of movieData) {
    datum.external_ids.tmdb_id = datum.id;

    if (datum.external_ids.imdb_id) {
      const omdbResponse = await omdb.requestMovieDetails(
        datum.external_ids.imdb_id,
      );

      datum.ratings = omdbResponse.data.Ratings;
    }
  }

  return movieData;
};

module.exports = {
  jw_getGenres,
  jw_getMovies,
  jw_getMoviesData,
  getConfigurations,
  getMovies,
  getMoviesData,
  getGenres,
  getProviders,
};
