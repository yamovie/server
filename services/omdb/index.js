const axios = require('axios');
const requests = require('../../utils/requests');

exports.requestMovieDetails = id => {
  requests.OMDB_DETAIL.params.i = id;
  return axios(requests.OMDB_DETAIL);
};
