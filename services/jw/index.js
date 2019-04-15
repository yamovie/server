const axios = require('axios');
const { requests } = require('../../configs');

const requestMovies = page => {
  requests.JW_SEARCH.data.page = page || 1;
  return axios(requests.JW_SEARCH);
};

const requestData = async id => {
  return axios.get(
    `https://apis.justwatch.com/content/titles/movie/${id}/locale/en_US`,
  );
};

const requestGenres = () => {
  return axios(requests.JW_GENRES);
};

const requestProviders = () => {
  return axios(requests.JW_PROVIDERS);
};

module.exports = {
  requestMovies,
  requestData,
  requestGenres,
  requestProviders,
};
