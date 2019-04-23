const passport = require('passport');
const jwt = require('jsonwebtoken');
// const UserService = require('../services/UserService');

let ProtectedRoutesController = {};

ProtectedRoutesController.sendResponse = (req, res, next) => {
  // Send back user details & token (you can do whatever you want here!)
  res.json({
    msg: 'This route is protected!',
    user: req.user,
    token: req.headers.authorization
  });
};

ProtectedRoutesController.getNewTokens = (req, res, next) => {
  const { email } = req.body;
  // const usr = new UserService();

  // console.log(UserService);
  // get the header;

  res.send('hi');
  // res.send(UserService);
  // const
};

module.exports = ProtectedRoutesController;
