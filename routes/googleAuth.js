const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/socialAuth');

router.get(
  '/login',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.email']
  })
);

router.get(
  '/callback',
  passport.authenticate('google', { session: false }),
  controller.sendResponse
);

module.exports = router;
