const { Movie } = require('../models');
const utils = require('../utils');
const certData = require('../utils/mpaa');

/**
 * Serves JSON object of all genres.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 */
const readAll = async (req, res) => {
  const qs = await utils.parser.query(req.url);
  const allMovies = await Movie.paginate({}, { page: qs.page || 1 });
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
  const qs = await utils.parser.query(req.url);
  const foundMovies = await Movie.paginate(
    { genre_ids: req.params.id },
    { page: qs.page || 1 },
  );
  return res.json(foundMovies);
};

const search = async (req, res) => {
  const { query } = await utils.parser.query(req.url);

  const foundMovie = await Movie.find({
    title: new RegExp(query, 'i'),
  });
  return res.json(foundMovie);
};

const readByRecommendation = async (req, res) => {
  const qs = await utils.parser.query(req.url);

  let {
    genres,
    mpaa,
    minYear,
    maxYear,
    rottenTomatoes,
    imdb,
    foreign,
    indie,
  } = req.body;

  const cert = certData.getCertification(mpaa);
  const certs = certData.filterCertifications(cert.order);

  const conditions = {
    genre_ids: { $in: genres },
    certifications: { $in: certs },
    release_year: { $gte: minYear, $lte: maxYear },
    'ratings.rotten_tomatoes.value': { $gte: rottenTomatoes },
    'ratings.internet_movie_database.value': { $gte: imdb },
  };

  if (!foreign) conditions.original_language = 'en';
  if (indie) conditions.budget = { $lt: 1000000 };

  const foundMovies = await Movie.paginate(conditions, { page: qs.page || 1 });
  res.json(foundMovies);
};

/**
 * INTERNAL USE ONLY
 *
 * Create new Movie document
 */
const create = movie => Movie.create(movie);

module.exports = {
  readAll,
  readOne,
  readByGenre,
  readByRecommendation,
  create,
  search,
};
