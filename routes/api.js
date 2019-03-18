const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const genreController = require('../controllers/genreController');

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

router.get('/movies', movieController.movieList);
router.get('/movies/:id', movieController.movieDetail);
router.get('/genres', genreController.genreList);

module.exports = router;
