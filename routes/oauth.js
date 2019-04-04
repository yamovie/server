const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

function createJWT(user) {
  return jwt.sign({ user }, SECRET, { expiresIn: '24h' });
}


/**
 * Routes that are triggered by React client
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

/**
 * Routes that are triggered by callbacks from OAuth providers once 
 * the user has authenticated successfully
*/
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const token = createJWT(req.user);
    res.redirect(`http://localhost:3000?token=${token}`);
    
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;




