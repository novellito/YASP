const userSVC = require('../services/UserService');

let ProtectedRoutesController = {};

ProtectedRoutesController.sendResponse = (req, res, next) => {
  // Send back user details & token (you can do whatever you want here!)
  res.json({
    msg: 'This route is protected!',
    user: req.user,
    token: req.headers.authorization
  });
};

// When retrieving new tokens, we delete the old record, generate a new set
// and send it back to the client
ProtectedRoutesController.getNewTokens = (req, res, next) => {
  const oldRefreshToken = req.headers.authorization.split(' ')[1];
  userSVC.deleteTokenRecord(oldRefreshToken);
  const { email } = req.body;
  const { token, refreshToken } = userSVC.generateTokens(email);
  res.send({ token, refreshToken });
};
// Delete the refresh token
ProtectedRoutesController.deleteToken = (req, res, next) => {
  const refreshToken = req.headers.authorization.split(' ')[1];
  userSVC.deleteTokenRecord(refreshToken);
  res.status(200).send({ message: 'Token has been deleted!' });
};

module.exports = ProtectedRoutesController;
