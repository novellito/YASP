const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/localAuth');

// first param of passport.authenticate() must = local if you dont explicitly pass first variablee in passport.use() (in local.auth.js)
router.post(
  '/signup',
  controller.verifyRegisterBody,
  passport.authenticate('signup', { session: false }),
  controller.sendResponse
);

router.post('/login', controller.handleLogin);

module.exports = router;
