const axios = require('axios');
const { requests } = require('../../utils');

exports.requestCertifications = () => {
  return axios(requests.TMDB_CERTIFICATIONS);
};

exports.requestConfigurations = () => {
  return axios(requests.TMDB_CONFIG);
};

/**
 * Requests TMDB API for movie data
 * @return  {Object}  movie data
 */
exports.requestNowPlayingMovies = page => {
  requests.TMDB_NOW_PLAYING.params.page = page;
  return axios(requests.TMDB_NOW_PLAYING);
};

exports.requestDiscoverMovies = page => {
  requests.TMDB_DISCOVER.params.page = page;
  return axios(requests.TMDB_DISCOVER);
};

exports.requestMovieDetails = id => {
  requests.TMDB_DETAIL.url = id.toString();
  return axios(requests.TMDB_DETAIL);
};

exports.requestGenres = () => {
  return axios(requests.TMDB_GENRES);
};
