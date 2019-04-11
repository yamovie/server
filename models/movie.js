const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { paginate } = require('../configs');

const movieSchema = new mongoose.Schema(
  {
    adult: {
      type: Boolean,
    },
    budget: {
      type: Number,
    },
    certifications: Array,
    genre_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Genre',
      required: true,
    },
    homepage: {
      type: String,
      default: '',
    },
    original_language: {
      type: String,
      default: '',
    },
    original_title: {
      type: String,
      default: '',
    },
    overview: {
      type: String,
      default: '',
    },
    production_companies: {
      type: [Object],
      default: [],
    },
    ratings: {
      type: Object,
      default: {},
    },
    release_date: {
      type: String,
      default: '',
    },
    release_year: {
      type: Number,
    },
    runtime: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: '',
    },
    tagline: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
    credits: {
      cast: {
        type: [Object],
        default: [],
      },
      crew: {
        type: [Object],
        default: [],
      },
    },
    images: {
      backdrops: {
        type: [Object],
        default: [],
      },
      posters: {
        type: [Object],
        default: [],
      },
    },
    videos: {
      type: [Object],
      default: [],
    },
    external_ids: {
      tmdb_id: {
        type: Number,
        required: true,
        unique: true,
      },
      imdb_id: {
        type: String,
      },
      facebook_id: {
        type: String,
        default: '',
      },
      instagram_id: {
        type: String,
        default: '',
      },
      twitter_id: {
        type: String,
        default: '',
      },
    },
  },
  { collection: 'movies' },
);

mongoosePaginate.paginate.options = {
  limit: 20,
  lean: true,
  leanWithId: true,
  customLabels: paginate.labels,
};

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
