const passport = require('passport');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

let LocalAuthController = {};

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
