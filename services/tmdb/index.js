const axios = require('axios');
const urls = require('../../utils/urls');

exports.discoverMovies = () => {
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'us',
      year: 2018,
      sort_by: 'release_date'
    }
  };

  return axios
    .get(urls.TMDB_DISCOVER, qs)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};

exports.getMovieDetails = async id => {
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY
    }
  };

  return await axios
    .get(`${urls.TMDB_DETAIL}${id}`, qs)
    .then(tmdbRes => {
      return axios.get(
        `${urls.OMDB}?apikey=${process.env.OMDB_KEY}&i=${tmdbRes.data.imdb_id}`
      );
    })
    .then(omdbRes => {
      return omdbRes.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};

exports.getGenres = () => {
  const qs = {
    params: {
      language: 'en-US',
      api_key: process.env.TMDB_KEY
    }
  };

  axios
    .get(urls.TMDB_GENRES, qs)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw new Error(error);
    });
};
