const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userSVC = require('../services/UserService');

module.exports = (...dependencies) => {
  const [passport] = dependencies;
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: '/google/callback',
        passReqToCallback: true
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const [email] = profile.emails;

          const user = await userSVC.addNewUserToDb(email.value);
          const { token, refreshToken } = userSVC.generateTokens(email.value);

          req.body = { user, token, refreshToken };

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
