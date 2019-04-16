const passport = require('passport');
const jwt = require('jsonwebtoken');

let LocalAuthController = {};

LocalAuthController.sendResponse = (req, res, next) => {
  res.json({
    message: 'Signup successful',
    user: req.user
  });
};

LocalAuthController.handleLogin = (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    try {
      if (err || !user) return next(err);

      req.login(user, { session: false }, error => {
        if (error) return next(error);

        // add the body to the jwt payload & sign token
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'top_secret');
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
module.exports = LocalAuthController;
