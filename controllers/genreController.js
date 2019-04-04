const { Genre } = require('../models');

/**
 * Serves an array of movie genres
 * @return  genres
 */
const readAll = async (req, res) => {
  const allGenres = await Genre.find({});

  return res ? res.json(allGenres) : allGenres;
};

const readOne = async (req, res) => {
  const foundGenre = await Genre.findById(req.params.id);
  return res.json(foundGenre);
};

const readOneByKey = key =>
  Genre.findOne({ 'external_ids.tmdb_id': key }).exec();

/**
 * Create new Genre document
 */
const create = genre => Genre.create(genre);

module.exports = {
  readAll,
  readOne,
  readOneByKey,
  create,
};
