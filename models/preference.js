const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
      },
    ],
    currMood: String,
    animated: Boolean,
    foreign: Boolean,
    indie: Boolean,
    certifications: [String],
    streamingServices: {
      hulu: Boolean,
      netflix: Boolean,
    },
    ratings: {
      imdb: {
        minRating: String,
        maxRating: String,
      },
      rottenTomatoes: {
        minRating: String,
        maxRating: String,
      },
      metacritic: {
        minRating: String,
        maxRating: String,
      },
    },
    release: {
      minYear: Number,
      maxYear: Number,
    },
  },
  { collection: 'preferences' },
);

// Hides user in response sent back to client
// preferenceSchema.methods.toJSON = () => {
//   const obj = this.toObject();
//   delete obj.user;
//   return obj;
// };

const Preference = mongoose.model('Preference', preferenceSchema);
module.exports = Preference;
