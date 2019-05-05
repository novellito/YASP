require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 5000 || process.env.PORT;

app.prepare().then(() => {
  const server = express();

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

  server.use(helmet());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(passport.initialize());

  server.use('/local', localAuthRoutes);
  server.use('/facebook', fbAuthRoutes);
  server.use('/twitter', twitterAuthRoutes);
  server.use('/google', googleAuthRoutes);
  server.use(
    '/user',
    passport.authenticate('resources', { session: false }),
    protectedRoutes
  );
  server.use(
    '/token',
    passport.authenticate('token', { session: false }),
    tokenRoutes
  );

  // Error handling middleware
  server.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`Server started on port: ${PORT}`);
  });
});

module.exports = app;
