const { Movie } = require('../models');
const { recommendations } = require('../configs');

const readBySearch = async (req, res) => {
  const conditions = {
    title: new RegExp(req.query.title, 'i'),
  };

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

/**
 * Serves JSON object of all genres.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const readAll = async (req, res) => {
  const allMovies = await Movie.paginate(
    {},
    {
      page: req.query.page || 1,
    },
  );
  return res.json(allMovies);
};

/**
 *
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const readOne = async (req, res) => {
  const foundMovie = await Movie.findById(req.params.id);
  return res.json(foundMovie);
};

const readByGenre = async (req, res) => {
  const foundMovies = await Movie.paginate(
    { genre_ids: req.params.id },
    { page: req.query.page || 1 },
  );
  return res.json(foundMovies);
};

const readByRecommendation = async (req, res) => {
  const certifications = recommendations.getCertifications(
    req.body.certification,
  );

  const conditions = {
    genre_ids: { $in: req.body.genres },
    certifications: { $in: certifications },
    release_year: { $gte: req.body.minYear, $lte: req.body.maxYear },
    'ratings.rotten_tomatoes.value': { $gte: req.body.rotten_tomatoes },
    'ratings.internet_movie_database.value': { $gte: req.body.imdb },
  };

  if (!req.body.foreign) conditions.original_language = 'en';
  if (req.body.indie)
    conditions.budget = { $lt: recommendations.INDIE_BUDGET_THRESHOLD };

  const foundMovies = await Movie.paginate(conditions, {
    page: req.query.page || 1,
  });
  res.json(foundMovies);
};

const create = movie => Movie.create(movie);

const insertMany = movies => Movie.insertMany(movies);

module.exports = {
  readAll,
  readOne,
  readByGenre,
  readByRecommendation,
  create,
  insertMany,
  readBySearch,
};
