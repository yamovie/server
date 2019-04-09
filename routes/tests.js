const router = require('express').Router();
const services = require('../services');

router.post('/', (req, res) => {
  console.log(req);
});

module.exports = router;
