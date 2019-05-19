const SocialsController = {};

SocialsController.addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId;
  req.session.socialType = req.query.social;
  next();
};

SocialsController.sendResponse = (req, res) => {
  const { user, token, refreshToken } = req.body;
  const io = req.app.get('io');

  io.in(req.session.socketId).emit(req.session.socialType, {
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
