const router = require('express').Router();
const userController = require('../controllers/userController');

// router.get('/', async (req, res) => {
//   const allUser = await User.find({});
//   if (res) res.json(allUser);
//   return allUser;
// });

router.get('/:id', userController.findOne);

// router.post('/:id'), async (req, res) => {

// }

module.exports = router;
