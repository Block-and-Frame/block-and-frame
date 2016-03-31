const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = require('express').Router();
const authController = require('./authController');

// Standard authentication routes
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);

// Instagram authentication
router.get('/instagram', passport.authenticate('instagram', { session: false }));
router.get('/instagram/callback', (req, res, next) => {
  passport.authenticate('instagram', {
    scope: ['public_content'],
    failureRedirect: '/signup' },
  (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log('Instagram Callback: User not found.');
      return res.redirect('/signup');
    }
    // Create jwt and send to front-end through url to access routes via jwt strategy
    const token = jwt.sign(user, process.env.SECRET, { expiresIn: 10080 });
    const userId = user.get('id');
    res.redirect(`/events?token=JWT+${token}&userId=${userId}`);
  })(req, res, next);
});

module.exports = router;
