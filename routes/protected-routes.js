const express = require('express');
const router = express.Router();
const controller = require('../controllers/protected-routes');

router.get('/profile', controller.sendResponse);

router.post('/token', controller.getNewTokens);

module.exports = router;
