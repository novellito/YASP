const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = (...dependencies) => {
  const [passport, userSVC] = dependencies;

  // Mote that you are able to send the data either via json or form-urlencoded
  // Will need to setup json body parser middleware if you send as json
  // Makesure the values are in line with the posted keys! - email & password
  passport.use(
    'signup', // this is explicitly naming this signup (default value is local)
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const hash = await bcrypt.hash(password, 10);
          const user = await userSVC.addNewUserToDb(email, hash);
          const { token, refreshToken } = userSVC.generateTokens(email);
          const body = {
            _id: user._id,
            email: user.email,
            token,
            refreshToken
          };
          return done(null, body);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  // Create a passport middleware to handle User login
  // Note first param of localStartegy is optional - will default to username & password if left out
  passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          // verify the user creds & return error when invalid
          const { user, message } = await userSVC.loginUser(email, password);
          if (message) return done({ message }, false);
          const { token, refreshToken } = userSVC.generateTokens(email);
          const body = {
            _id: user._id,
            email: user.email,
            token,
            refreshToken
          };
          return done(null, body);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  const JWTstrategy = require('passport-jwt').Strategy;
  const ExtractJWT = require('passport-jwt').ExtractJwt;

  passport.use(
    new JWTstrategy(
      {
        secretOrKey: process.env.SECRET_ONE,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (token, done) => {
        try {
          // Send user to next middleware
          return done(null, token.user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
