const db = require('../data/db');

/**
 * Returns an array of movie genres
 *
 * @return  genres
 */
exports.genreList = (req, res) => {
  return res.json(db.get('genres').value());
};
