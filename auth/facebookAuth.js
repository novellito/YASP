const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;
  passport.use(
    'facebook',
    new FacebookStrategy(
      {
        clientID: config.FACEBOOK_ID,
        clientSecret: config.FACEBOOK_SECRET,
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
