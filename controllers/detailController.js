const Detail = require('../models/detail');
const controllers = require('../controllers');
const services = require('../services');
const parser = require('../utils/parser');

/**
 * Returns all data of a specific movie
 * @param   id  the movie id, found in request
 * @return      movie data
 */
module.exports.getOne = (req, res) => {
  Detail.findOne({ movie_id: req.params.id })
    .exec()
    .then(async foundDetail => {
      if (!foundDetail) {
        const movie = await controllers.movie.getOne(req.params.id);
        const movieData = await services.getMovieDetails(
          movie._private.external_ids.tmdb
        );
        foundDetail = parser.details(movieData, movie._id);
        controllers.detail.create(foundDetail);
      }

      res.json(foundDetail);
    })
    .catch(error => console.log(error.stack));
};

/**
 * Create new Detail document
 */
module.exports.create = details => {
  Detail.create(details);
};

module.exports.update = () => {};

module.exports.delete = () => {};
