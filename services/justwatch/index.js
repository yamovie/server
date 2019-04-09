const axios = require('axios');
const { requests } = require('../../utils');

module.exports.requestMovies = page => {
  requests.JW_SEARCH.data.page = page || 1;
  return axios(requests.JW_SEARCH);
};

module.exports.requestData = id => {
  return axios.get(
    `https://apis.justwatch.com/content/titles/movie/${id}/locale/en_US`,
  );
};
