const axios = require('axios');
const requests = require('../../utils/requests');

exports.requestConfigurations = () => {
  return axios(requests.TMDB_CONFIG);
};

/**
 * Requests TMDB API for movie data
 * @return  {Object}  movie data
 */
exports.requestNowPlayingMovies = () => {
  return axios(requests.TMDB_NOW_PLAYING);
};

exports.requestDiscoverMovies = () => {
  return axios(requests.TMDB_DISCOVER);
};

exports.requestMovieDetails = id => {
  requests.TMDB_DETAIL.url = id.toString();
  return axios(requests.TMDB_DETAIL);
};

exports.requestGenres = () => {
  console.log(requests.TMDB_GENRES);
  return axios(requests.TMDB_GENRES);
};
