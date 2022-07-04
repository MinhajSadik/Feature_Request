const Joi = require("joi");

exports.validateRegister = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
  next();
};

exports.validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      name: error.name,
      success: false,
      message: error.message,
    });
  }
  next();
};
