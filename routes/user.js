const router = require('express').Router();
const userController = require('../controllers/userController');

// router.get('/', async (req, res) => {
//   const allUser = await User.find({});
//   if (res) res.json(allUser);
//   return allUser;
// });

router.get('/:id', userController.findOne);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
