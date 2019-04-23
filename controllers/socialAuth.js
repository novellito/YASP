let SocialsController = {};

SocialsController.sendResponse = (req, res) => {
  const { user, token, refreshToken } = req.body;
  res
    .status(200)
    .send({ _id: user._id, email: user.email, refreshToken, token });
};

module.exports = SocialsController;
