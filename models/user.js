const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: String,
  fullName: String,
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

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.pre('save', (next) => {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = (tryPassword, cb) => {
  bcrypt.compare(tryPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  })
}

const User = mongoose.model('User', userSchema);
module.exports = User;
