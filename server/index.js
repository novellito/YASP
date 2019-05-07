require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');

const app = express();
const PORT = 5000 || process.env.PORT;

// import routes
const localAuthRoutes = require('./routes/localAuth');
const fbAuthRoutes = require('./routes/facebookAuth');
const twitterAuthRoutes = require('./routes/twitterAuth');
const googleAuthRoutes = require('./routes/googleAuth');
const protectedRoutes = require('./routes/protected-routes');
const tokenRoutes = require('./routes/tokenRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(
  // 'mongodb://mongo:27017/passport-jwt',
  'mongodb://localhost:27017/passport-jwt',
  { useNewUrlParser: true, useCreateIndex: true },
  err => (err ? console.log(err) : console.log('Connected to DB!'))
);

require('./auth/localAuth')(passport);
require('./auth/facebookAuth')(passport);
require('./auth/twitterAuth')(passport);
require('./auth/googleAuth')(passport);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/api/local', localAuthRoutes);
app.use('/api/facebook', fbAuthRoutes);
app.use('/api/twitter', twitterAuthRoutes);
app.use('/api/google', googleAuthRoutes);
app.use(
  '/api/user',
  passport.authenticate('resources', { session: false }),
  protectedRoutes
);
app.use(
  '/api/token',
  passport.authenticate('token', { session: false }),
  tokenRoutes
);

// Error handling middleware
app.use((err, req, res, next) => {
  res.send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
