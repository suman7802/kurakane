const FacebookStrategy = require('passport-facebook');
const getCreateUSER = require('../utils/createGetUser');

function facebookAuth(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.F_CLIENT_ID,
        clientSecret: process.env.F_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/redirect/facebook',
        graphAPIVersion: 'v17.0',
      },
      async (accessToken, refreshToken, profile, done) => {
        const userProfile = {
          social_id: profile.id,
          user_name: profile.displayName,
          provider: profile.provider,
          email: null,
          password: null,
        };
        console.log(userProfile);
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

module.exports = facebookAuth;