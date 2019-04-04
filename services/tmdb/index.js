const axios = require('axios');
const { requests } = require('../../utils');

const requestConfigurations = () => axios(requests.TMDB_CONFIG);

/**
 * Requests TMDB API for movie data
 * @return  {Object}  movie data
 */
const requestNowPlayingMovies = page => {
  requests.TMDB_NOW_PLAYING.params.page = page;
  return axios(requests.TMDB_NOW_PLAYING);
};

const requestDiscoverMovies = page => {
  requests.TMDB_DISCOVER.params.page = page;
  return axios(requests.TMDB_DISCOVER);
};

const requestMovieDetails = id => {
  requests.TMDB_DETAIL.url = id.toString();
  return axios(requests.TMDB_DETAIL);
};

const requestGenres = () => axios(requests.TMDB_GENRES);

module.exports = {
  requestConfigurations,
  requestNowPlayingMovies,
  requestDiscoverMovies,
  requestMovieDetails,
  requestGenres,
};
