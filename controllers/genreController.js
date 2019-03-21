const Genre = require('../models/genre');

/**
 * Returns an array of movie genres
 * @return  genres
 */
module.exports.getAll = (req, res) => {
  Genre.find({}, '-_private -__v')
    .exec()
    .then(allGenres => {
      res.json(allGenres);
    })
    .catch(error => console.log(error.stack));
};

/**
 * Create new Genre document
 */
module.exports.create = genre => {
  Genre.create(genre);
};

module.exports.update = () => {};

module.exports.delete = () => {};
