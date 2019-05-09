const FacebookStrategy = require('passport-facebook').Strategy;
const userSVC = require('../services/UserService');
const tokenSVC = require('../services/TokenService');

module.exports = (...dependencies) => {
  const [passport] = dependencies;
  passport.use(
    'facebook',
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/api/facebook/callback',
        passReqToCallback: true,
        profileFields: ['emails', 'displayName']
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const username = profile.displayName;
          const [email] = profile.emails;

          const user = await userSVC.addNewUserToDb({
            email: email.value,
            username
          });
          const { token, refreshToken } = tokenSVC.generateTokens(email.value);

          req.body = { user, token, refreshToken };
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
