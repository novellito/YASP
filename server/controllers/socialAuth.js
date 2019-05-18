const SocialsController = {};

SocialsController.addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
};

SocialsController.sendResponse = (req, res) => {
  const { user, token, refreshToken } = req.body;
  const io = req.app.get('io');

  // ! TODO: make this dynamic
  io.in(req.session.socketId).emit('facebook', {
    _id: user._id,
    email: user.email,
    username: user.username,
    refreshToken,
    token
  });

  res.status(200).send({
    _id: user._id,
    email: user.email,
    username: user.username,
    refreshToken,
    token
  });
};

module.exports = SocialsController;
