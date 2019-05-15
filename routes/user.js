const router = require('express').Router();
const controllers = require('../controllers');

router.post('/signup', controllers.user.signup);
router.post('/login', controllers.user.login);
router.post('/watchlist', controllers.user.addMovieToWatchlist);
router.get('/watchlist/:id', controllers.user.getWatchlistMovies);
router.delete('/watchlist/:id', controllers.user.deleteWatchlistMovie);

module.exports = router; 
