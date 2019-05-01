const router = require('express').Router();
const controllers = require('../controllers');

router.post('/signup', controllers.user.signup);
router.post('/login', controllers.user.login);
router.post('/watchlist', controllers.user.watchlist);

module.exports = router;
