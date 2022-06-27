const { check, validationResult } = require("express-validator");
exports.signupValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is required."),

  check("email")
    .trim()
    .not()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Invalid email address."),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password confirm must be between 8-32 characters."),

  check("passwordConfirm")
    .trim()
    .notEmpty()
    .withMessage("Password confirm is required.")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password confirm must be between 8-32 characters."),

  check("passwordConfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password does not match.");
    }
    return true;
  }),
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req).array();
  // Map errors and create object and send it back with response.
  const errObj = {};
  if (errors.length > 0) {
    for (let error of errors) {
      if (!errObj[error.param]) {
        errObj[error.param] = error.msg;
      }
    }
    return res.status(401).json({
      error: errObj,
    });
  }
  next();
};
// DUM
