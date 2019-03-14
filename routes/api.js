const express = require('express');
const router = express.Router();

const tmdb = require('./tmdb');
const db = require('../data/db');

router.get('/movies', (req, res) => {
  if (
    !db.has('movies').value() ||
    db
      .get('movies')
      .size()
      .value() === 0
  ) {
    console.log('Calling TMDB...');
    tmdb.seedMovies();
  }

  console.log('Getting movies...');
  return res.json(db.get('movies').value());
});

router.get('/movies/:id', (req, res) => {
  const movie = db
    .get('movies')
    .find({ id: parseInt(req.params.id) })
    .value();

  console.log(movie);
  movie
    ? res.json(movie)
    : res.status(404).json({ Error: 'Bad request: Invalid ID' });
});

router.get('/genres', (req, res) => {
  if (
    !db.has('genres').value() ||
    db
      .get('genres')
      .size()
      .value() === 0
  ) {
    console.log('Calling TMDB...');
    tmdb.seedGenres();
  }

  console.log('GET genres...');
  return res.json(db.get('genres').value());
});

module.exports = router;
