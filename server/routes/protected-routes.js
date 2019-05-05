const express = require('express');
const router = express.Router();
const controller = require('../controllers/protected-routes');

router.get('/profile', controller.sendResponse);

module.exports = router;
