const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.findOne = (req, res) => {
  User.find({ googleId: req.params.id }).then(userData => res.json(userData));
};

module.exports.signup = (req, res) => {
  let user = new User(req.body)
  user.save()
  .then(user => {
    res.json({ token: createJWT(user) })
  })
  .catch(err => res.status(400).json(err));
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec().then(user => {
    if (!user) return res.status(401).json({ err: 'bad credentials' });
    user.comparePassowrd(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        res.json({ token: createJWT(user) });
      }
      return res.status(401).json({ err: 'bad credentials' });
    });
  }).catch(err => res.status(401).json(err));
};

function createJWT(user) {
  return jwt.sign({user}, SECRET, {expiresIn: '24h'})
}