const router = require('express').Router();
const passport = require('passport');
const oauthController = require('../controllers/oauthController');
// jwt express
 
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
  failureRedirect: 'http://localhost:3000',
  accessType: 'offline',
  approvalPrompt: 'force',
});

// Routes that are triggered by the React client
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

// Routes that are triggered by callbacks from OAuth providers once 
// the user has authenticated successfully
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const {token} = req.user;
    res.redirect(`http://localhost:3000?token=${token}`);
    
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;




