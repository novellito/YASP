const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const router = express.Router();
const controller = require('../controllers/socialAuth');

router.use(
  '/',
  expressSession({
    secret: process.env.SECRET_ONE,
    resave: false,
    saveUninitialized: true
  })
);
router.get('/login', passport.authenticate('twitter'));

router.get(
  '/callback',
  passport.authenticate('twitter', { session: false }),
  controller.sendResponse
);

module.exports = router;
