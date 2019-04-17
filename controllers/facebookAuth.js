const passport = require('passport');
const jwt = require('jsonwebtoken');

let FacebookController = {};

FacebookController.sendResponse = (req, res) => {
  const token = jwt.sign({ user: req.body }, 'top_secret');
  const { _id, email } = req.body;
  res.status(200).send({ _id, email, token });
};

module.exports = FacebookController;
