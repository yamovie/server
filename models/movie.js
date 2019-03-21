const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    poster_path: {
      type: String,
      required: true
    },
    genre_ids: {
      type: [Number],
      required: true
    },
    release_date: {
      type: String
    },
    _private: {
      external_ids: {
        type: Object,
        required: true
      }
    }
  },
  { collection: 'movies' }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
