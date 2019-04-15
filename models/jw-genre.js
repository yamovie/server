const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema(
  {
    translation: String,
    short_name: String,
    technical_name: String,
    slug: String,
    external_ids: Object,
  },
  { collection: 'jw_genres' },
);

const JW_Genre = mongoose.model('JW_Genre', genreSchema);
module.exports = JW_Genre;
