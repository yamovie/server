const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

/**
 * GET request for movie list
 * @return  array of movies
 */
router.get('/movies', controllers.movie.getAll);

/**
 * GET request for specific movie
 * @param   id  movie id
 * @return     movie details
 */
router.get('/movies/:id', controllers.detail.getOne);

router.get('/movies/genre/:id', controllers.movie.getByGenre);

/**
 * GET request for genre list
 * @return  array of genres
 */
router.get('/genres', controllers.genre.getAll);

module.exports = router;
