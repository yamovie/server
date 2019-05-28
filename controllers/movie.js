const { Movie } = require('../models');
const { recommendations } = require('../configs');

const readBySearchAll = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi')
  const conditions = Movie.find({$or: [{'title': regex}, {'credits.cast.name': regex}, {'credits.crew.name': regex}]})

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchTitle = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi')
  const conditions = Movie.find({'title': regex})

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchCast = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi')
  const conditions = Movie.find({'credits.cast.name': regex})

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchCrew = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi')
  const conditions = Movie.find({'credits.crew.name': regex})

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
  const foundMovie = await Movie.findById(req.params.id).populate(
    'genres offers.buy.provider offers.rent.provider offers.stream.provider',
  );
  return res.json(foundMovie);
};

const readByGenre = async (req, res) => {
  const foundMovies = await Movie.paginate(
    { genres: req.params.id },
    { page: req.query.page || 1 },
  );
  return res.json(foundMovies);
};

const readByRecommendation = async (req, res) => {
  console.log(req.body);

  const applicableCerts = recommendations.getCertifications(
    req.body.certification,
  );

  const conditions = {
    genres: { $in: req.body.genres },
    certification: { $in: applicableCerts },
    release_year: { $gte: req.body.min_year, $lte: req.body.max_year },
    'ratings.rotten_tomatoes.value': { $gte: req.body.rotten_tomatoes },
    'ratings.imdb.value': { $gte: req.body.imdb },
  };

  if (!req.body.foreign) conditions.original_language = 'en';
  if (req.body.indie)
    conditions.budget = { $lte: recommendations.INDIE_BUDGET_THRESHOLD };

  const foundMovies = await Movie.paginate(conditions, {
    page: req.query.page || 1,
  });
  res.json(foundMovies);
};

const create = movie => Movie.create(movie);

const insertMany = movies => Movie.insertMany(movies, { ordered: false });

module.exports = {
  model: Movie.modelName,
  readAll,
  readOne,
  readByGenre,
  readByRecommendation,
  create,
  insertMany,
  readBySearchAll,
  readBySearchTitle,
  readBySearchCast,
  readBySearchCrew,
};
