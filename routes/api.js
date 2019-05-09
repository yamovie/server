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
 * GET/PATCH requests for preferences
 */
router.get('/preferences/:id', controllers.preference.getPreferences);
router.patch('/preferences/:id', controllers.preference.updatePreference);

/**
 * GET requests for providers
 */
router.get('/providers', controllers.provider.readAll);
router.get('/providers/stream', controllers.provider.readStream);
router.get('/providers/buy', controllers.provider.readBuy);
router.get('/providers/rent', controllers.provider.readRent);
router.get('/providers/free', controllers.provider.readFree);

module.exports = router;
