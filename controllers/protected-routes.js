const tokenSVC = require('../services/TokenService');

let ProtectedRoutesController = {};

ProtectedRoutesController.sendResponse = (req, res, next) => {
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

  tokenSVC.validateRefreshToken(oldRefreshToken, obj => {
    if (!obj || obj.email !== email)
      return res.status(403).send({ message: 'Invalid Credentials!' });

    tokenSVC.deleteTokenRecord(oldRefreshToken);
    const { token, refreshToken } = tokenSVC.generateTokens(email);

    res.status(200).send({ token, refreshToken });
  });
};

// Delete the refresh token
ProtectedRoutesController.deleteToken = (req, res, next) => {
  const refreshToken = req.headers.authorization.split(' ')[1];
  tokenSVC.deleteTokenRecord(refreshToken);
  res.status(200).send({ message: 'Token has been deleted!' });
};

module.exports = ProtectedRoutesController;
