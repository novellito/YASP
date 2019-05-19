const express = require('express');
const passport = require('passport');
const controller = require('../controllers/socialAuth');

const router = express.Router();

router.get(
  '/login',
  controller.addSocketIdtoSession,
  passport.authenticate('twitter')
);

router.get(
  '/callback',
  passport.authenticate('twitter', { session: false }),
  controller.sendResponse
);

module.exports = router;
