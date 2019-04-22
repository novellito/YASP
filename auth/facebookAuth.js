const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;
  passport.use(
    'facebook',
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/facebook/callback',
        passReqToCallback: true,
        profileFields: ['emails']
      },
      async (req, accessToken, refreshToken, profile, done) => {
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
