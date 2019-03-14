const express = require('express');
const router = express.Router();

const tmdb = require('./tmdb');
const db = require('../data/db');

/**
 * NOTES:
 *
 * All requests will be primarily served data from local database.
 *
 * If data is not found, data will be queried via TMDB API, stored locally,
 * then served to request.
 *
 * All data will be formatted in JSON.
 */

/**
 * Returns all data from every movie.
 *
 * @return  data of every movie
 */
router.get('/movies', (req, res) => {
  return res.json(db.get('movies').value());
});

/**
 * Returns all data of a specific movie
 *
 * @param   id  the movie id, found in request
 * @return      movie data
 */
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

/**
 * Returns an array of movie genres
 *
 * @return  genres
 */
router.get('/genres', (req, res) => {
  return res.json(db.get('genres').value());
});

module.exports = router;
