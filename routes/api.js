const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');
const genreController = require('../controllers/genreController');

router.get('/movies', movieController.movieList);
router.get('/movies/:id', movieController.movieDetail);
router.get('/movies/genres/:id', movieController.movieFilterByGenre);
router.get('/genres', genreController.genreList);

module.exports = router;
