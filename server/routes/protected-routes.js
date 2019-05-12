const express = require('express');
const router = express.Router();
const controller = require('../controllers/protected-routes');

router.get('/profile', controller.fetchUserInfo, controller.sendResponse);

module.exports = router;
