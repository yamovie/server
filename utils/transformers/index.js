// module.exports.jw = require('./jw');
// module.exports.tmdb = require('./tmdb');

module.exports = require(`./${process.env.SEED_SOURCE}`);
