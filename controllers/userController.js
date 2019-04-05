const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { SECRET } = process.env;

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}

// module.exports.findOne = (req, res) => {
//   User.find({ googleId: req.params.id }).then(userData => res.json(userData));
// };

/**
 * creates new user in database
 * @param {Object} req user data
 * @param {string} res token
 */
const signup = (req, res) => {
  const newUser = User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  }) 
    .then(user => {
      res.json({ token: createJWT(user) });
    })
    .catch(err => res.status(400).json(err));
}

/**
 * Checks user credentials
 * @param {Object} req credentials
 * @param {string} res token
 */
const login = (req, res) => {
  User.findOne({ email: req.body.email }).exec().then(user => {
    if (!user) return res.status(401).json({ err: 'bad credentials' });
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        return res.json({ token: createJWT(user) });
      }
      return res.status(401).json({ err: 'bad credentials' });
    });
  }).catch(err => res.status(401).json(err));
};

module.exports = {
  login,
  signup,
};
