const express = require('express');
const passport = require('passport');
const controller = require('../controllers/socialAuth');

const router = express.Router();

router.get(
  '/login',
  controller.addSocketIdtoSession,
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
