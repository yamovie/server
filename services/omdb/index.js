const axios = require('axios');
const requests = require('../../utils/requests');

exports.getMovieDetails = async id => {
  requests.OMDB_DETAIL.params.i = id;
  return await axios(requests.OMDB_DETAIL)
    .then(res => {
      console.log(res);
      return res.data;
    })
    .catch(error => {
      console.log(error.stack);
    });
};
