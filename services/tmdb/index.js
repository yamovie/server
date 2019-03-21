const axios = require('axios');
const requests = require('../../utils/requests');

/**
 * Requests TMDB API for movie data
 * @return  {Object}  movie data
 */
exports.getNowPlayingMovies = () => {
  return axios(requests.TMDB_NOW_PLAYING)
    .then(response => response.data)
    .catch(error => console.log(error.stack));
};

exports.discoverMovies = () => {
  return axios(requests.TMDB_DISCOVER)
    .then(response => response.data)
    .catch(error => console.log(error.stack));
};

exports.getMovieDetails = id => {
  requests.TMDB_DETAIL.url = requests.TMDB_DETAIL.url.concat(id);
  return axios(requests.TMDB_DETAIL)
    .then(response => response.data)
    .catch(error => console.log(error.stack));
};

exports.getGenres = () => {
  return axios(requests.TMDB_GENRES)
    .then(response => response.data)
    .catch(error => console.log(error.stack));
};
