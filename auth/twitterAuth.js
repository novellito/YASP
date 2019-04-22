const TwitterStrategy = require('passport-twitter').Strategy;
const config = require('../config/config');

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.TWITTER_KEY,
        consumerSecret: config.TWITTER_SECRET,
        callbackURL: '/twitter/callback',
        passReqToCallback: true,
        includeEmail: true
      },
      async (req, token, tokenSecret, profile, done) => {
        try {
          const [email] = profile.emails;

          const user = await userSVC.addNewUserToDb(email.value);

          req.body = user;

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
