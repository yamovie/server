const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    adult: {
      type: Boolean,
      required: true,
    },
    genre_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Genre',
      required: false,
    },
    homepage: String,
    original_language: {
      type: String,
      required: true,
    },
    original_title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    production_companies: {
      type: [Object],
      required: true,
    },
    ratings: {
      type: Object,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    runtime: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tagline: String,
    title: {
      type: String,
      required: true,
    },
    credits: {
      cast: {
        type: [Object],
        required: true,
      },
      crew: {
        type: [Object],
        required: true,
      },
    },
    images: {
      backdrops: {
        type: [Object],
        required: true,
      },
      posters: {
        type: [Object],
        required: true,
      },
    },
    videos: {
      type: [Object],
      required: true,
    },
    external_ids: {
      type: Object,
      required: true,
    },
    external_ids: {
      tmdb_id: {
        type: Number,
        required: true,
        unique: true,
      },
      imdb_id: {
        type: String,
        required: true,
      },
      facebook_id: String,
      instagram_id: String,
      twitter_id: String,
    },
  },
  { collection: 'movies' },
);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
