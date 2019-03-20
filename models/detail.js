const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema(
  {
    tmdb_id: String,
    release_year: String,
    cast: String,
    director: String,
    genres: String,
    ratings: {
      source: String,
      rating: String
    },
    plot: String,
    runtime: String
  },
  { collection: 'details' }
);

const Detail = mongoose.model('Detail', detailSchema);
module.exports = Detail;
