const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    genres: {
      type: Map,
      of: Boolean,
    }, // genres: { [id]: Boolean }
    currMood: String,
    animated: Boolean,
    foreign: Boolean,
    indie: Boolean,
    certifications: {
      type: Map,
      of: Boolean,
    }, // certifications: { [certName]: Boolean }
    providers: {
      type: Map,
      of: Boolean,
    }, // providers: { [id]: Boolean }
    ratings: {
      imdb: {
        minRating: Number,
        maxRating: Number,
      },
      rottenTomatoes: {
        minRating: Number,
        maxRating: Number,
      },
      metacritic: {
        minRating: Number,
        maxRating: Number,
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
