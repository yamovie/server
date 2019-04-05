const { Movie } = require('../models');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
module.exports.readAll = async (req, res) => {
  const allMovies = await Movie.find({});

  if (res) res.json(allMovies);
  else return allMovies;
};

/**
 * Returns data of specific movie
 * @param   id  movie id
 * @return      promise, movie
 */
module.exports.readOne = async (req, res) => {
  const foundMovie = await Movie.findById(req.params.id);
  res.json(foundMovie);
};

module.exports.readByGenre = async (req, res) => {
  const foundMovies = await Movie.find({ genre_ids: req.params.id });
  res.json(foundMovies);
};

/**
 * INTERNAL USE ONLY
 *
 * Create new Movie document
 */
module.exports.create = movie => Movie.create(movie);
