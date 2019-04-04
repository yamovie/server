const { Movie } = require('../models');
const { parser } = require('../utils');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
const readAll = async (req, res) => {
  const qs = await parser.qs(req.url);
  const allMovies = await Movie.paginate({}, { page: qs.page || 1 });

  res.json(allMovies);
};

/**
 * Returns data of specific movie
 * @param   id  movie id
 * @return {Promise}     promise, movie
 */
const readOne = async (req, res) => {
  const foundMovie = await Movie.findById(req.params.id);
  res.json(foundMovie);
};

const readByGenre = async (req, res) => {
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
const create = movie => Movie.create(movie);

module.exports = { readAll, readOne, readByGenre, create };
