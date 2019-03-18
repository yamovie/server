const axios = require('axios');
const db = require('../../data/db');
const parser = require('./parser');

let tmdb = {};

tmdb.seedMovies = () => {
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY,
      region: 'US',
      language: 'en-US',
      primary_release_year: 2018,
      sort_by: 'vote_average.desc',
      page: 1
    }
  };

  axios
    .get('https://api.themoviedb.org/3/discover/movie', qs)
    .then(res => {
      res.data.results.forEach(movie => {
        const newMovie = parser.movie(movie);
        db.get('movies')
          .push(newMovie)
          .write();
      });
    })
    .catch(error => {
      throw new Error(error);
    });
};

tmdb.getMovieDetails = async id => {
  const qs = {
    params: {
      api_key: process.env.TMDB_KEY
    }
  };

  await axios
    .get(`https://api.themoviedb.org/3/movie/${id}`, qs)
    .then(res => {
      const details = parser.details(res.data);

      db.get('movies')
        .find({ id })
        .assign({ details })
        .write();
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
      res.data.genres.forEach(genre => {
        db.get('genres')
          .push(genre)
          .write();
      });
    })
    .catch(error => {
      throw new Error(error);
    });
};

module.exports = tmdb;
