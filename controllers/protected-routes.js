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

// When retrieving new tokens, first validate that the refresh token associated email matches
// with the given email and then we delete the old record, generate a new set of tokens
// and send it back to the client
ProtectedRoutesController.getNewTokens = (req, res, next) => {
  const { email } = req.body;
  const oldRefreshToken = req.headers.authorization.split(' ')[1];
  userSVC.validateRefreshToken(oldRefreshToken, obj => {
    if (!obj || obj.email !== email)
      return res.status(403).send({ message: 'Invalid Credentials!' });
    userSVC.deleteTokenRecord(oldRefreshToken);
    const { token, refreshToken } = userSVC.generateTokens(email);
    res.status(200).send({ token, refreshToken });
  });
};
// Delete the refresh token
ProtectedRoutesController.deleteToken = (req, res, next) => {
  const refreshToken = req.headers.authorization.split(' ')[1];
  userSVC.deleteTokenRecord(refreshToken);
  res.status(200).send({ message: 'Token has been deleted!' });
};

module.exports = ProtectedRoutesController;
