const googleAuth = require('../services/googleAuth.js');

function authenticate(app, passport) {
  googleAuth(passport);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.get('/api/user/oauth2', passport.authenticate('google', {scope: ['profile', 'email']}));
  
  app.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/dashboard',
    })
  );
}

module.exports = authenticate;
