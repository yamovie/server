const Detail = require('../models/detail');
const controllers = require('../controllers');
const tmdb = require('../services/tmdb');
const parser = require('../utils/parser');

/**
 * Returns all data of a specific movie
 * @param   id  the movie id, found in request
 * @return      movie data
 */
exports.getOne = (req, res) => {
  const id = parseInt(req.params.id);
  Detail.findOne({ tmdb_id: req.params.id }).exec(async (err, foundDetail) => {
    if (err) throw new Error(err);
    else if (!foundDetail) {
      foundDetail = await tmdb.getMovieDetails(id);
      foundDetail = parser.details(foundDetail, id);
      controllers.detail.create(foundDetail);
    }

    res.json(foundDetail);
  });
};

exports.create = details => {
  Detail.create(details);
};

exports.update = () => {};

exports.delete = () => {};
