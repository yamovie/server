const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema(
  {
    tmdb_id: {
      type: String,
      required: true,
      unique: true
    },
    release_year: {
      type: String,
      required: true
    },
    cast: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    genres: {
      type: String,
      required: true
    },
    ratings: {
      type: [
        {
          source: String,
          rating: String
        }
      ],
      required: true
    },
    plot: {
      type: String,
      required: true
    },
    runtime: {
      type: String,
      required: true
    }
  },
  { collection: 'details' }
);

const Detail = mongoose.model('Detail', detailSchema);
module.exports = Detail;
