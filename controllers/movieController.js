const Movie = require('../models/movie');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
module.exports.getAll = (req, res) => {
  Movie.find({}, '-_private -__v')
    .exec()
    .then(allMovies => {
      res.json(allMovies);
    })
    .catch(error => console.log(error.stack));
};

/**
 * DEPRECATED!
 *
 * Return array of movies that match genre
 * @param   id  genre id, found in request
 * @return      array of movies
 */
module.exports.getAllByGenre = (req, res) => {
  Movie.find({ genre_ids: req.params.id })
    .exec()
    .then(foundMovies => {
      res.json(foundMovies);
    })
    .catch(error => console.log(error.stack));
};

/**
 * Returns promise of finding specific movie
 * @param   id  movie id
 * @return      promise, movie
 */
module.exports.getOne = id => {
  return Movie.findById(id)
    .exec()
    .then(foundMovie => {
      return foundMovie;
    })
    .catch(error => console.log(error.stack));
};

/**
 * Create new Movie document
 */
module.exports.create = movie => {
  Movie.create(movie);
};

module.exports.update = () => {};

module.exports.delete = () => {};
