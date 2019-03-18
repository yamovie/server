const requestPromise = require('request-promise-native');
const request = require('request');
const db = require('../../data/db');
const options = require('./options');
const parser = require('./parser');

let tmdb = {};

tmdb.seedMovies = () => {
  request(options.init, (err, res, body) => {
    if (err) throw new Error(err);

    // Seed 20 movies
    body.results.forEach(movie => {
      const newMovie = parser.movie(movie);

      db.get('movies')
        .push(newMovie)
        .write();
    });
  });
};

tmdb.getMovieDetails = async id => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}`,
    qs: {
      api_key: process.env.TMDB_KEY
    },
    json: true,
    body: '{}'
  };

  await requestPromise(options).then(body => {
    const details = parser.details(body);

    db.get('movies')
      .find({ id })
      .assign({ details })
      .write();
  });
};

tmdb.seedGenres = () => {
  request(options.genres, (err, res, body) => {
    if (err) throw new Error(err);

    body.genres.forEach(genre => {
      db.get('genres')
        .push(genre)
        .write();
    });
  });
};

module.exports = tmdb;
