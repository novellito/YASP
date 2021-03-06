const TwitterStrategy = require('passport-twitter').Strategy;
const userSVC = require('../services/UserService');
const tokenSVC = require('../services/TokenService');

module.exports = (...dependencies) => {
  const [passport] = dependencies;
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
        callbackURL: '/api/twitter/callback',
        passReqToCallback: true,
        includeEmail: true
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const username = profile.username;
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
