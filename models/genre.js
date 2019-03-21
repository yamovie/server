const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true
    },
    _private: {
      external_ids: {
        type: Object,
        required: true
      }
    }
  },
  { collection: 'genres' }
);

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
