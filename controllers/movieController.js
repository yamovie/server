const Movie = require('../models/movie');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
module.exports.getAll = (req, res) => {
  Movie.find({})
    .exec()
    .then(allMovies => res.json(allMovies))
    .catch(error => console.log(error.stack));
};

/**
 * Returns data of specific movie
 * @param   id  movie id
 * @return      promise, movie
 */
module.exports.getOne = (req, res) => {
  Movie.findById(req.params.id)
    .exec()
    .then(foundMovie => res.json(foundMovie))
    .catch(error => console.log(error.stack));
};

module.exports.getByGenre = (req, res) => {
  Movie.find({ genre_keys: req.params.id })
    .exec()
    .then(foundMovies => res.json(foundMovies))
    .catch(error => console.log(error.stack));
};

/**
 * INTERNAL USE ONLY
 *
 * Create new Movie document
 */
module.exports.create = movie => Movie.create(movie);

module.exports.update = () => {};

module.exports.delete = () => {};
