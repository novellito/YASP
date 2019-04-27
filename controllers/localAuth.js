const passport = require('passport');
const Joi = require('joi');

const LocalAuthController = {};

const registerBodySchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  password: Joi.string()
    .min(4)
    .required()
});

// We ensure that the incoming register body only comprises of an email and password!
LocalAuthController.verifyRegisterBody = (req, res, next) => {
  const { error } = Joi.validate(req.body, registerBodySchema);
  if (error) return next(error);
  next();
};

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
