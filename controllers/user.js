const jwt = require('jsonwebtoken');
const { Preference, User } = require('../models');

const { SECRET } = process.env;

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}

// module.exports.findOne = (req, res) => {
//   User.find({ googleId: req.params.id }).then(userData => res.json(userData));
// };

/**
 * creates new user and preference document in database, which are assosciated
 * @param {Object} req user data
 * @param {string} res token
 */
const signup = async (req, res) => {
  const newPreference = await new Preference();

  const newUser = await new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    preference: newPreference,
  });

  newPreference.userId = newUser._id;

  Promise.all([newPreference.save(), newUser.save()])
    .then(savedObjects => {
      res.json({
        message: 'Saved',
        data: savedObjects,
        token: createJWT(newUser),
      });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

/**
 * Checks user credentials
 * @param {Object} req credentials
 * @param {string} res token
 */
function login(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) return res.status(401).json({ err: 'bad credentials' });
      user.comparePassword(req.body.pw, (err, isMatch) => {
        if (isMatch) {
          return res.json({ token: createJWT(user) });
        }
        return res.status(401).json({ err: 'bad credentials' });
      });
    })
    .catch(err => res.status(401).json(err));
}

function watchlist(req, res) {
  User.findByIdAndUpdate(req.body.userId, { $push: { watchlist: req.body.movieId } } )
    .exec()
    .catch(err => res.status(401).json(err));
}

module.exports = {
  login,
  signup,
  watchlist,
};
