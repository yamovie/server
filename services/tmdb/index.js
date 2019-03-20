const axios = require('axios');
// const db = require('../../data/db');
const db = require('../../models');
const parser = require('../../utils/parser');

let tmdb = {};

tmdb.seedMovies = () => {
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'us',
      year: 2018,
      sort_by: 'release_date'
    }
  };

  axios
    .get('https://api.themoviedb.org/3/discover/movie', qs)
    .then(res => {
      res.data.results.forEach(data => {
        const movie = parser.list(data);
        try {
          db.Movie.create(movie);
        } catch (err) {
          throw new Error(err);
        }
      });
    })
    .catch(error => {
      throw new Error(error);
    });
};

tmdb.getMovieDetails = async id => {
  console.log('getting details..');
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY
    }
  };

  return await axios
    .get(`https://api.themoviedb.org/3/movie/${id}`, qs)
    .then(tmdbRes => {
      return axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${
          tmdbRes.data.imdb_id
        }`
      );
    })
    .then(omdbRes => {
      const details = parser.details(omdbRes.data, id);
      try {
        return db.Detail.create(details);
      } catch (err) {
        throw new Error(err);
      }
    })
    .catch(error => {
      throw new Error(error);
    });
};

tmdb.seedGenres = () => {
  const qs = {
    params: {
      language: 'en-US',
      api_key: process.env.TMDB_KEY
    }
  };

  axios
    .get('https://api.themoviedb.org/3/genre/movie/list', qs)
    .then(res => {
      res.data.genres.forEach(data => {
        const genre = parser.genre(data);
        try {
          db.Genre.create(genre);
        } catch (err) {
          throw new Error(err);
        }
      });
    })
    .catch(error => {
      throw new Error(error);
    });
};

module.exports = tmdb;
