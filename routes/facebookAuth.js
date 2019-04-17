const express = require('express');
const passport = require('passport');

const router = express.Router();
const controller = require('../controllers/facebookAuth');

router.get('/login', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/callback',
  passport.authenticate('facebook', { session: false }),
  controller.sendResponse
);

module.exports = router;
