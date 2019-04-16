const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { paginate, requests } = require('../configs');

const movieSchema = new mongoose.Schema(
  {
    jw_url: String,
    jw_image_url: String,
    certification: String,
    original_language: String,
    original_title: String,
    overview: String,
    release_date: String,
    release_year: Number,
    runtime: Number,
    title: String,
    genres: [
      {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'JW_Genre',
      },
    ],
    credits: Object,
    ratings: Object,
    images: {
      poster: String,
      backdrops: [Object],
    },
    videos: [Object],
    offers: {
      buy: [
        {
          provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
          },
          hd: Object,
          sd: Object,
          fourk: Object,
        },
      ],
      rent: [
        {
          provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
          },
          hd: Object,
          sd: Object,
          fourk: Object,
        },
      ],
      stream: [
        {
          provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Provider',
          },
          hd: Object,
          sd: Object,
          fourk: Object,
        },
      ],
    },
  },
  { collection: 'jw_movies' },
);

mongoosePaginate.paginate.options = {
  limit: requests.JW_SEARCH.data.page_size,
  populate:
    'genres offers.buy.provider offers.rent.provider offers.stream.provider',
  lean: true,
  leanWithId: true,
  customLabels: paginate.labels,
};

movieSchema.plugin(mongoosePaginate);

const JW_Movie = mongoose.model('JW_Movie', movieSchema);
module.exports = JW_Movie;
