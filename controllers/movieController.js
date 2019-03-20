const Movie = require('../models/movie');

/**
 * Returns all data from every movie.
 * @return  array of movies
 */
exports.getAll = (req, res) => {
  Movie.find({}, (err, allMovies) => {
    if (err) throw new Error(err);

    res.json(allMovies);
  });
};

/**
 * Return array of movies that match genre
 * @param   id  the genre id, found in request
 * @return      array of movies
 */
exports.getAllByGenre = (req, res) => {
  Movie.find({ genre_ids: req.params.id }).exec((err, foundMovies) => {
    if (err) throw new Error(err);

    res.json(foundMovies);
  });
};

exports.create = movie => {
  Movie.create(movie);
};

exports.update = () => {};

exports.delete = () => {};
