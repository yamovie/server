const Genre = require('../models/genre');

/**
 * Returns an array of movie genres
 * @return  genres
 */
exports.getAll = (req, res) => {
  Genre.find({}, (err, allGenres) => {
    if (err) throw new Error(err);

    res.json(allGenres);
  });
};

exports.create = genre => {
  Genre.create(genre);
};

exports.update = () => {};

exports.delete = () => {};
