const passport = require('passport');
const jwt = require('jsonwebtoken');

let ProtectedRoutesController = {};

ProtectedRoutesController.sendResponse = (req, res, next) => {
  // Send back user details & token (you can do whatever you want here!)
  res.json({
    msg: 'This route is protected!',
    user: req.user,
    token: req.headers.authorization
  });
};

module.exports = ProtectedRoutesController;
