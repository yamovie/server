const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema(
  {
    genre: {
      type: String,
      required: true
    },
    key: {
      type: String,
      required: true
    }
  },
  { collection: 'genres' }
);

const Genre = mongoose.model('Genre', genreSchema);
module.exports = Genre;
