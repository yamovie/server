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
    tmdb_id: {
      type: Number,
      required: true
    },
    genre_ids: [Number]
  },
  { collection: 'movies' }
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
