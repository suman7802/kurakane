const googleAuth = require('../services/googleAuth.js');
const facebookAuth = require('../services/facebookAuth.js');

function authenticate(app, passport) {
  //google strategy
  googleAuth(passport);

  //facebook strategy
  facebookAuth(passport);

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // google login
  app.get(
    '/api/user/google',
    passport.authenticate('google', {scope: ['profile', 'email']})
  );

  // google redirect
  app.get(
    '/oauth2/redirect/google',
    passport.authenticate('google', {
      failureRedirect: '/',
      successRedirect: '/dashboard',
    })
  );

  //facebook login
  app.get('/api/user/facebook', passport.authenticate('facebook', {}));

  //facebook redirect
  app.get(
    '/auth/redirect/facebook',
    passport.authenticate('facebook', {
      failureRedirect: '/',
      successRedirect: '/dashboard',
    })
  );
}

module.exports = authenticate;
