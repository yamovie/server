const axios = require('axios');
const { requests } = require('../../utils');

exports.requestMovieDetails = id => {
  requests.OMDB_DETAIL.params.i = id;
  return axios(requests.OMDB_DETAIL);
};
