const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true
    },
    tmdb_id: {
      type: Number,
      required: true,
      unique: true
    }
  },
  { collection: 'genres' }
);

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
