const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const app = express();
require('dotenv').config();
const PORT = 5000 || process.env.PORT;
// import routes
const localAuthRoutes = require('./routes/localAuth');
const fbAuthRoutes = require('./routes/facebookAuth');
const twitterAuthRoutes = require('./routes/twitterAuth');
const googleAuthRoutes = require('./routes/googleAuth');
const protectedRoutes = require('./routes/protected-routes');

// import services
const UserService = require('./services/UserService');

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/passport-jwt',
  { useNewUrlParser: true, useCreateIndex: true },
  err => (err ? console.log(err) : console.log('Connected to DB!'))
);

require('./auth/localAuth')(passport, UserService);
require('./auth/facebookAuth')(passport, UserService);
require('./auth/twitterAuth')(passport, UserService);
require('./auth/googleAuth')(passport, UserService);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/local', localAuthRoutes);
app.use('/facebook', fbAuthRoutes);
app.use('/twitter', twitterAuthRoutes);
app.use('/google', googleAuthRoutes);
app.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  protectedRoutes
);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
