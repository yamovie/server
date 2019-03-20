const tmdb = require('../services/tmdb');
// const db = require('./db');

const { client } = require('../models');

// client.connect(err => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });

const seed = () => {
  // tmdb.seedMovies();
  // tmdb.seedGenres();
  // let test = await db.Movie.create({
  //   title: 'Test',
  //   poster_path: 'google.com'
  // });
  // if (
  //   !db.has('movies').value() ||
  //   db
  //     .get('movies')
  //     .size()
  //     .value() === 0
  // ) {
  //   tmdb.seedMovies();
  // }
  // if (
  //   !db.has('genres').value() ||
  //   db
  //     .get('genres')
  //     .size()
  //     .value() === 0
  // ) {
  //   tmdb.seedGenres();
  // }
};

module.exports = seed;
