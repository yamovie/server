const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: String,
  streamingService: { 
    type: Object, 
    default: false,
  },
  watchlist: {
    type: [Object],
  },
  preferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preference',
    required: false,
  },
  googleId: String, 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
