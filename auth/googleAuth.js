const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;
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

          req.body = user;

          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
