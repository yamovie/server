const db = require('../data/db');
const tmdb = require('../services/tmdb');

/**
 * Returns all data from every movie.
 *
 * @return  data of every movie
 */
exports.movieList = (req, res) => {
  return res.json(db.get('movies').value());
};

/**
 * Returns all data of a specific movie
 *
 * @param   id  the movie id, found in request
 * @return      movie data
 */
exports.movieDetail = async (req, res) => {
  const movie = db
    .get('movies')
    .find({ id: parseInt(req.params.id) })
    .value();

  if (!movie) {
    res.status(404).json({ Error: 'Bad request: Invalid ID' });
  } else if (!movie.details) {
  }
  await tmdb.getMovieDetails(parseInt(req.params.id));

  res.json(movie);
};
