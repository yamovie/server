const request = require('request');
const db = require('../data/db');

const discoverMoviesOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: {
    api_key: process.env.TMDB_KEY,
    language: 'en-US',
    primary_release_year: 2018,
    sort_by: 'vote_average.desc',
    page: 1
  },
  json: true,
  body: '{}'
};

var genresOptions = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  qs: {
    language: 'en-US',
    api_key: process.env.TMDB_KEY
  },
  body: '{}'
};

const TMDB_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=';
const TMDB_QUERY_URL =
  'https://api.themoviedb.org/3/movie/{id}?api_key={api_key}';

let tmdb = {};

tmdb.seedMovies = () => {
  console.log('Seeding movies...');
  request(discoverMoviesOptions, (err, res, body) => {
    if (err) throw new Error(err);

    // Seed 20 movies
    body.results.forEach(movie => {
      db.get('movies')
        .push(movie)
        .write();
    });
  });
};

tmdb.seedGenres = () => {
  console.log('Seeding genres...');
  request(genresOptions, (err, res, body) => {
    if (err) throw new Error(err);

    JSON.parse(body).genres.forEach(genre => {
      db.get('genres')
        .push(genre)
        .write();
    });
  });
};

module.exports = tmdb;
