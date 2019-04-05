const { Genre } = require('../models');

/**
 * Serves JSON object of all movies, if res is passed. Returns an array of
 * all movies, otherwise.
 * @param {Object} req HTTP request
 * @param {Object} res HTTP response
 * @return {(Object|Array)}
 */
const readAll = async (req, res) => {
  const allGenres = await Genre.find({});
  return res ? res.json(allGenres) : allGenres;
};

/**
 * Serves JSON object of one movie
 * @param {Object} req HTTP request
 * @param {String} req.params.id Genre id
 * @param {Object} res HTTP response
 * @return
 */
const readOne = async (req, res) => {
  const foundGenre = await Genre.findById(req.params.id);
  return res.json(foundGenre);
};

/**
 * Returns promise to find genre based on key
 * @param {Number} key tmdb id
 * @return {Promise}
 */
const readOneByKey = async key => {
  const foundGenre = await Genre.findOne({ 'external_ids.tmdb_id': key });
  return foundGenre;
};

/**
 * Creates new genre document in database
 * @param {Object} genre genre info
 */
const create = genre => Genre.create(genre);

module.exports = {
  readAll,
  readOne,
  readOneByKey,
  create,
};
