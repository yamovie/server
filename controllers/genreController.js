const db = require('../data/db');
const Genre = require('../models/genre');

/**
 * Returns an array of movie genres
 *
 * @return  genres
 */
exports.genreList = (req, res) => {
  // return res.json(db.get('genres').value());
  // return res.json(db.Genre.find());
  Genre.find({}, (err, allGenres) => {
    if (err) throw new Error(err);

    res.json(allGenres);
  });
};
