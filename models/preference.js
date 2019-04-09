const mongoose = require('mongoose');

const { Schema } = mongoose;


const preferenceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  genres: [{
    type: Schema.Types.ObjectId,
    ref: 'Genre',
  }],
  currMood: String,
  animated: Boolean,
  foreign: Boolean,
  indie: Boolean,
  mpaaRatings: [{}],
  ratings: {
    imdb: Number,
    rottenTomatoes: Number,
  },
  release: {
    startYear: Number,
    endYear: Number,
  },
},
{ collection: 'preferences' });

const Preference = mongoose.model('Preference', preferenceSchema);
module.exports = Preference;
