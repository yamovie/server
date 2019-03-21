const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema(
  {
    movie_id: mongoose.Schema.Types.ObjectId,
    cast: [
      {
        type: Object,
        required: true
      }
    ],
    crew: [
      {
        type: Object,
        required: true
      }
    ],
    plot: {
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
    runtime: {
      type: String,
      required: true
    },
    videos: {
      type: [
        {
          type: Map,
          of: String
        }
      ],
      required: true
    }
  },
  { collection: 'details' }
);

const Detail = mongoose.model('Detail', detailSchema);
module.exports = Detail;
