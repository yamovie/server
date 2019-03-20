const db = require('../data/db');
const Movie = require('../models/movie');
const Detail = require('../models/detail');
const tmdb = require('../services/tmdb');

/**
 * Returns all data from every movie.
 *
 * @return  data of every movie
 */
exports.movieList = (req, res) => {
  // return res.json(db.get('movies').value());

  Movie.find({}, (err, allMovies) => {
    if (err) throw new Error(err);

    res.json(allMovies);
  });
};

/**
 * Returns all data of a specific movie
 *
 * @param   id  the movie id, found in request
 * @return      movie data
 */
exports.movieDetail = (req, res) => {
  Detail.findOne({ tmdb_id: req.params.id }).exec(async (err, foundDetail) => {
    if (err) throw new Error(err);
    else if (!foundDetail) {
      foundDetail = await tmdb.getMovieDetails(parseInt(req.params.id));
    }

    res.json(foundDetail);
  });
};

exports.movieFilterByGenre = (req, res) => {
  Movie.find({ genre_ids: req.params.id }).exec((err, foundMovies) => {
    if (err) throw new Error(err);

    res.json(foundMovies);
  });
};
