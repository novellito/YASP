const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userSVC = require('../services/UserService');
const tokenSVC = require('../services/TokenService');

module.exports = (...dependencies) => {
  const [passport] = dependencies;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: '/api/google/callback',
        passReqToCallback: true
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const [email] = profile.emails;
          const username = email.value.split('@')[0];

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
