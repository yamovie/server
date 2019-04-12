const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { paginate } = require('../configs');

const movieSchema = new mongoose.Schema(
  {
    jw_url: String,
    certification: String,
    original_language: String,
    original_title: String,
    overview: String,
    release_date: String,
    release_year: Number,
    runtime: Number,
    title: String,
    genre_ids: [Number],
    credits: Object,
    ratings: Object,
    images: {
      poster: String,
      backdrops: [Object],
    },
    videos: [Object],
    offers: Object,
  },
  { collection: 'jw_movies' },
);

mongoosePaginate.paginate.options = {
  limit: 20,
  lean: true,
  leanWithId: true,
  customLabels: paginate.labels,
};

movieSchema.plugin(mongoosePaginate);

const JW_Movie = mongoose.model('JW_Movie', movieSchema);
module.exports = JW_Movie;
