const axios = require('axios');
const requests = require('../../utils/requests');
const omdb = require('../omdb');

exports.getNowPlayingMovies = async () => {
  return await axios(requests.TMDB_NOW_PLAYING)
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.stack));
};

exports.discoverMovies = async () => {
  return await axios(requests.TMDB_DISCOVER)
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.stack));
};

exports.getMovieDetails = async id => {
  requests.TMDB_DETAIL.url = requests.TMDB_DETAIL.url.concat(id);
  return await axios(requests.TMDB_DETAIL)
    .then(async res => {
      return res.data;
    })
    .catch(error => console.log(error.stack));
};

exports.getGenres = async () => {
  return await axios(requests.TMDB_GENRES)
    .then(res => {
      return res.data;
    })
    .catch(error => console.log(error.stack));
};
