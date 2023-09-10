const GoogleStrategy = require('passport-google-oauth20').Strategy;
const getEmailCreateEmail = require('../utils/check.email');

function googleAuth(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await getEmailCreateEmail(profile);
          return done(null, user);
        } catch (error) {
          console.error('Error login user:', error);
          throw error;
        }
      }
    )
  );
}

module.exports = googleAuth;
