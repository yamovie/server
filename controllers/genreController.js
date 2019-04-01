const Genre = require('../models/genre');

/**
 * Returns an array of movie genres
 * @return  genres
 */
module.exports.getAll = (req, res) => {
  Genre.find({})
    .exec()
    .then(allGenres => res.json(allGenres))
    .catch(error => console.log(error.stack));
};

module.exports.getOne = (req, res) => {
  Genre.findById(req.params.id)
    .exec()
    .then(foundGenre => res.json(foundGenre))
    .catch(error => console.log(error.stack));
};

module.exports.getOneByKey = key =>
  Genre.findOne({ 'external_ids.tmdb_id': key }).exec();

/**
 * Create new Genre document
 */
module.exports.create = genre => {
  Genre.create(genre).catch(error => console.log(error.stack));
};

module.exports.update = () => {};

module.exports.delete = () => {};
