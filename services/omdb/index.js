const axios = require('axios');
const { requests } = require('../../configs');

const requestMovieDetails = id => {
  requests.OMDB_DETAIL.params.i = id;
  return axios(requests.OMDB_DETAIL);
};

module.exports = {
  requestMovieDetails,
};
