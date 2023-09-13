const GoogleStrategy = require('passport-google-oauth20').Strategy;
const getCreateUSER = require('../models/createGetUser');

function googleAuth(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        callbackURL: process.env.G_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const userProfile = {
          social_id: profile.id,
          user_name: profile.displayName,
          email: profile._json.email,
          provider: profile.provider,
        };
        try {
          const user = await getCreateUSER(userProfile);
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
