const jwt = require('jsonwebtoken');

let SocialsController = {};

SocialsController.sendResponse = (req, res) => {
  const token = jwt.sign({ user: req.body }, process.env.SECRET_ONE);
  const { _id, email } = req.body;
  res.status(200).send({ _id, email, token });
};

module.exports = SocialsController;
