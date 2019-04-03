const mongodb = require('mongodb');
const { Movie, Genre } = require('../models');
const { configs } = require('../utils');
const parser = require('../utils/parser');
const certData = require('../utils/mpaa');

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

module.exports.readByRecommendation = async (req, res) => {
  const qs = await parser.qs(req.url);

  let {
    genres,
    mpaa,
    minYear,
    maxYear,
    rottenTomato,
    imdb,
    foreign,
    indie,
  } = req.body;

  const cert = certData.getCertification(mpaa);
  const certs = certData.filterCertifications(cert.order);

  genres = genres.map(genre => mongodb.ObjectID(genre));

  const conditions = {
    genre_ids: { $in: genres },
    certifications: { $in: certs },
    release_year: { $gte: minYear, $lte: maxYear },
    'ratings.rotten_tomatoes.value': { $gte: rottenTomato },
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
module.exports.create = movie => Movie.create(movie);
