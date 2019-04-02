const router = require('express').Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const allUser = await User.find({});
  if (res) res.json(allUser);
  return allUser;
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

module.exports = router;
