const jwt = require('jsonwebtoken');
const { Preference, User, Movie } = require('../models');

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
  const newPreference = new Preference();
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    preferenceId: newPreference._id,
    watchlist: [],
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
}

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

const addMovieToWatchlist = (req, res) => {
  console.log('.....Added...');
  const { userId } = req.params;
  const { movieId } = req.body;

  console.log(userId, movieId);
  // add to set.
  User.findByIdAndUpdate(userId, { $addToSet: { watchlist: {movieId: movieId, favorite: true, watched: false} }  } )
    .then(res.status(200).json({message: 'added to watchlist'}))
    .catch(err => res.status(401).json(err));
}

// Gets all the watchlist movies from a user
const getWatchlistMovies = async (req, res) => {
  User.findById(req.params.userId)
  .populate('watchlist.movieId')
  .select('watchlist')
  .then(movies => res.json(movies.watchlist));
  
  // Movie.find({ _id: { $in: movieIds } } )
  // .select('images.poster _id')
  // .then(movies => {
  //   console.log(movies);
  //   res.status(200).json(movies)
  // })
  // .catch(e => res.status(500).json({error: e}));
  
  // watchlistMovies.populate('genres offers.buy.provider offers.rent.provider offers.stream.provider')
}

// const getWatchlistMovies = async (req, res) => {
//   let movieIds = [];
//   const watchlist = await User.findById(req.params.userId).select('watchlist');
//   watchlist.watchlist.forEach(movie => movieIds.push(movie.movieId));
  
//   Movie.find({ _id: { $in: movieIds } } )
//   .select('images.poster _id')
//   .then(movies => res.status(200).json(movies))
//   .catch(e => res.status(500).json({error: e}));
  
//   // watchlistMovies.populate('genres offers.buy.provider offers.rent.provider offers.stream.provider')
// }

const updateWatchlistItem = async (req, res) => {
  const { userId, movieId } = req.params;
  const { watched, favorite } = req.body.data;
  console.log(req.body.data);

  User.update( 
    { _id: userId, "watchlist._id": movieId }, 
    { $set: { 'watchlist.$.watched': watched, 'watchlist.$.favorite': favorite,  } },
  )
  .then(something => res.json(something));
}

// Deletes a selected watchlist movie
const deleteWatchlistMovie = (req, res) => {
  const movieId = req.body.movieId;
  const userId = req.params.id

  User.findOneAndUpdate(
    { _id: userId },
    { $pull: { watchlist: { movieId } } },
  )
  .then(res.status(200).json(`Movie ${movieId} succesfully deleted from watchlist`))
  .catch(e => { console.log(`potato............ ${e}`); res.status(500).json({error: e})});
}

module.exports = {
  login,
  signup,
  addMovieToWatchlist,
  getWatchlistMovies,
  deleteWatchlistMovie,
  updateWatchlistItem,
};

//[{watched: false, movieId: '123251gdsg'}, {watched: false, movieId: '123251gdsg'}]