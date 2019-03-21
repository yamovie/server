const Genre = require('../models/genre');

/**
 * Returns an array of movie genres
 * @return  genres
 */
module.exports.getAll = (req, res) => {
  Genre.find({}, (err, allGenres) => {
    if (err) throw new Error(err);

    res.json(allGenres);
  });
};

/**
 * Create new Genre document
 */
module.exports.create = genre => {
  Genre.create(genre);
};

module.exports.update = () => {};

module.exports.delete = () => {};
