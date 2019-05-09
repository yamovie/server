const router = require('express').Router();
const controllers = require('../controllers');

router.get('/movies/search', controllers.movie.readBySearch);

/**
 * GET request for movie list
 * @return  array of movies
 */
// router.get('/movies', controllers.movie.readAll);

/**
 * GET request for specific movie
 * @param   id  movie id
 * @return      movie details
 */
router.get('/movies/:id', controllers.movie.readOne);
router.get('/movies/genre/:id', controllers.movie.readByGenre);
router.post('/movies/recommend', controllers.movie.readByRecommendation);

/**
 * GET request for genre list
 * @return  array of genres
 */
router.get('/genres', controllers.genre.readAll);
router.get('/genres/:id', controllers.genre.readOne);

/**
 * GET requests for preferences
 */
router.get('/preferences/:id', controllers.preference.getPreferences);
router.patch('/preferences/:id', controllers.preference.updatePreference);

module.exports = router;
