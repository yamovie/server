const router = require('express').Router();
const controllers = require('../controllers');

router.post('/signup', controllers.user.signup);
router.post('/login', controllers.user.login);
router.post('/:userId/watchlist', controllers.user.addMovieToWatchlist);
router.get('/:userId/watchlist/', controllers.user.getWatchlistMovies);
router.delete('/watchlist/:id', controllers.user.deleteWatchlistMovie);
router.put('/:userId/watchlist/:movieId', controllers.user.updateWatchlistItem);

module.exports = router; 
