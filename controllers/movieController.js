const Movie = require('../models/movie');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
module.exports.getAll = (req, res) => {
  Movie.find({}, '-_private -__v')
    .exec()
    .then(allMovies => {
      res.json(allMovies);
    })
    .catch(error => console.log(error.stack));
};

/**
 * Return array of movies that match genre
 * @param   id  the genre id, found in request
 * @return      array of movies
 */
module.exports.getAllByGenre = (req, res) => {
  Movie.find({ genre_ids: req.params.id }).exec((err, foundMovies) => {
    if (err) throw new Error(err);

    res.json(foundMovies);
  });
};

module.exports.getOne = id => {
  return Movie.findById(id)
    .exec()
    .then(foundMovie => {
      return foundMovie;
    })
    .catch(error => console.log(error.stack));
};

/**
 * Create new Movie document
 */
module.exports.create = movie => {
  Movie.create(movie);
};

module.exports.update = () => {};

module.exports.delete = () => {};
