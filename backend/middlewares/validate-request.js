const { validationResult } = require("express-validator");

// Validate the incoming requests
module.exports.validateRequest = async (req, res, next) => {
  const errors = validationResult(req);
  const formatErrors = errors.errors.map((error) => {
    return { error: error.msg, parameter: error.param };
  });
  if (!errors.isEmpty()) {
    return res.status(400).json(formatErrors);
  }
  next();
};
