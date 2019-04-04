const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK,
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) {
      return done(null, user);
    }
    const newUser = {
      name: profile.displayName,
      email: profile.emails[0].value,
      birthday: profile.birthday,
      googleId: profile.id,
      token: accessToken,
    };
    User.create(newUser);
    return done(null, newUser);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
