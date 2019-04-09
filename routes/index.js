const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('YaMovie Server');
});

router.use('/auth', require('./oauth'));
router.use('/api', require('./api'));
router.use('/users', require('./user'));
router.use('/preferences', require('./preferences'));

module.exports = router;
