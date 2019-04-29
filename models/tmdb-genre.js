const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    external_ids: {
      tmdb_id: {
        type: Number,
        required: true,
        unique: true,
      },
    },
  },
  { collection: 'genres' },
);

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
