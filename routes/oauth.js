const express = require('express');

const router = express.Router();
const passport = require('passport');
const oauthController = require('../controllers/oauthController');
 
const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// This custom middleware allows us to attach the socket id to the session.
// With the socket id attached we can send back the right user info to the right socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

// Routes that are triggered by the React client
router.get('/google', addSocketIdtoSession, googleAuth);
router.get('/hi', (req, res) => console.log('hi'));
// Routes that are triggered by callbacks from OAuth providers once 
// the user has authenticated successfully
router.get('/google/callback', googleAuth, oauthController.google);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;




