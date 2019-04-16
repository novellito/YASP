const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/model');
const bcrypt = require('bcrypt');

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
        // First check if the email has been taken & save if it isn't
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) throw new Error('User already exists!');

        const hash = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hash });
        user.save();

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

//Create a passport middleware to handle User login
// Note first param is optional - will default to username & password if left out
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });
        if (!user) return done({ message: 'User not found' }, false);

        const validPW = await user.isValidPassword(password);
        if (!validPW) return done({ message: 'Invalid Password' }, false);

        // Send the user info if they exist & the correct password is entered
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

//This verifies that the token sent by the user is valid
passport.use(
  new JWTstrategy(
    {
      //secret we used to sign our JWT
      secretOrKey: 'top_secret',
      //we expect the user to send the token as a query paramater with the name 'secret_token'
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      // jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        console.log(token);
        //Pass the user details to the next middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
