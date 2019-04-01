const { Movie } = require('../models');
const { configs } = require('../utils');
const parser = require('../utils/parser');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
module.exports.readAll = async (req, res) => {
  const qs = await parser.qs(req.url);
  const allMovies = await Movie.paginate({}, { page: qs.page || 1 });

  res.json(allMovies);
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
  const qs = await parser.qs(req.url);

  const foundMovies = await Movie.paginate(
    { genre_ids: req.params.id },
    { page: qs.page || 1 },
  );
  res.json(foundMovies);
};

/**
 * INTERNAL USE ONLY
 *
 * Create new Movie document
 */
module.exports.create = movie => Movie.create(movie);
