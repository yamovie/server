const axios = require('axios');
const uri = require('../../utils/uri');

exports.discoverMovies = async () => {
  return await axios(uri.TMDB_DISCOVER)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};

exports.getMovieDetails = async id => {
  return await axios(`${uri.TMDB_DETAIL.path}${id}`, uri.TMDB_DETAIL)
    .then(tmdbRes => {
      return axios.get(`${uri.OMDB_MOVIE}${tmdbRes.data.imdb_id}`);
    })
    .then(omdbRes => {
      return omdbRes.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};

exports.getGenres = async () => {
  return await axios(uri.TMDB_GENRES)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};
