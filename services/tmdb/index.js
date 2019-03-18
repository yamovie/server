const axios = require('axios');
const db = require('../../data/db');
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
      res.data.results.forEach(movie => {
        const newMovie = parser.list(movie);
        db.get('movies')
          .push(newMovie)
          .write();
      });
      console.log(db.get('movies').value());
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
    .then(tmdbRes => {
      return axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${
          tmdbRes.data.imdb_id
        }`
      );
    })
    .then(omdbRes => {
      const details = parser.details(omdbRes.data);

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
