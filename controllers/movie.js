const { Movie } = require('../models');
const { requests } = require('../configs');

const readBySearchAll = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi');
  const conditions = Movie.find({
    $or: [
      { title: regex },
      { 'credits.cast.name': regex },
      { 'credits.crew.name': regex },
    ],
  });

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchTitle = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi');
  const conditions = Movie.find({ title: regex });

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchCast = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi');
  const conditions = Movie.find({ 'credits.cast.name': regex });

  const options = { page: req.query.page || 1 };

  const foundMovie = await Movie.paginate(conditions, options);
  return res.json(foundMovie);
};

const readBySearchCrew = async (req, res) => {
  const regex = new RegExp(req.query.searchInput, 'gi');
  const conditions = Movie.find({ 'credits.crew.name': regex });

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
  // console.log(req.body);
  const { certifications, genres, release, ratings, foreign } = req.body;

  // const applicableCerts = recommendations.getCertifications(req.body.certification);
  const applicableCerts = Object.keys(certifications).filter(
    certKey => certifications[certKey],
  );
  const applicableGenres = Object.keys(genres).filter(genreKey => genres[genreKey]);

  const conditions = {
    genres: { $in: applicableGenres },
    certification: { $in: applicableCerts },
    release_year: { $gte: release.minYear, $lte: release.maxYear },
    'ratings.rotten_tomatoes.value': {
      $gte: ratings.rottenTomatoes.minRating,
      $lte: ratings.rottenTomatoes.maxRating,
    },
    'ratings.imdb.value': { $gte: ratings.imdb.minRating, $lte: ratings.imdb.maxRating },
  };
  if (!foreign) conditions.original_language = 'en';
  // TODO: Potentially add provider checking/filtering. Currently no good way to do so
  // based on how the database is structured, so needs to be handled on front end for now
  // const { providers } = req.body;
  // if (providers) {
  //   const applicableProviders = Object.keys(providers).filter(provKey => providers[provKey]);
  //   conditions['offers.stream[??].provider._id'] = { $in: applicableProviders };
  // }

  const foundMovies = await Movie.paginate(conditions, {
    page: req.query.page || 1,
    limit: req.body.maxRecs || requests.JW_SEARCH.data.page_size,
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
