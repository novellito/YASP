const express = require('express');
const controller = require('../controllers/protected-routes');

const router = express.Router();

router.post('/', controller.getNewTokens);
router.delete('/', controller.deleteToken);

module.exports = router;
