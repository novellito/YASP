const passport = require('passport');

const LocalAuthController = {};

LocalAuthController.sendResponse = (req, res) => {
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
        return res.json({ user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

module.exports = LocalAuthController;
