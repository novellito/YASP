const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config/config');
const UserModel = require('../models/User');

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
        const existingUser = await UserModel.findOne({ email: email.value });
        if (existingUser) throw new Error('User already exists!');

        const user = new UserModel({ email: email.value });
        user.save();
        req.body = user;

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
