const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: String,
    fullName: String,
    streamingService: Object,
    watchlist: {
      type: [Object],
    },
    preferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Preference',
      required: false,
    },
    googleId: String,
    password: String,
  },
  { collection: 'users' },
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // password has been changed - salt and hash it
  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    // override the user provided password with the hash
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  // 'this' represents the document that you called comparePassword on
  bcrypt.compare(tryPassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// userSchema.post('save', (next) => {
//   next();
// });

const User = mongoose.model('User', userSchema);
module.exports = User;
