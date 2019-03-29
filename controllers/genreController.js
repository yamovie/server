const { Genre } = require('../models');

/**
 * Serves an array of movie genres
 * @return  genres
 */
module.exports.readAll = async (req, res) => {
  const allGenres = await Genre.find({});

  if (res) res.json(allGenres);
  else return allGenres;
};

module.exports.readOne = async (req, res) => {
  const foundGenre = await Genre.findById(req.params.id);
  res.json(foundGenre);
};

module.exports.readOneByKey = key =>
  Genre.findOne({ 'external_ids.tmdb_id': key }).exec();

/**
 * Create new Genre document
 */
module.exports.create = genre => Genre.create(genre);
