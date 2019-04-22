const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_KEY,
        consumerSecret: process.env.TWITTER_SECRET,
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
