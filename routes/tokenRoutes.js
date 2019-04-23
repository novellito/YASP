const express = require('express');
const router = express.Router();
const controller = require('../controllers/protected-routes');

router.post('/', controller.getNewTokens);
router.delete('/', controller.deleteToken);

module.exports = router;
