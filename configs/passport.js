const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Preference } = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        }
        const newPreference = new Preference();
        const newUser = new User({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          birthday: profile.birthday,
          googleId: profile.id,
          token: accessToken,
          preferenceId: newPreference._id,
        });
        newPreference.userId = newUser._id;
        
        Promise.all([
          newPreference.save(),
          newUser.save(),
        ]).then(() => done(null, newUser)).catch((error) => {
          done(error);
        });
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
