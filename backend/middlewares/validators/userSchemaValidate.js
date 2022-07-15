import Joi from "joi";

export const registerValidate = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required().min(3).max(14),
    email: Joi.string().required().email().unique(),
    password: Joi.string().required().min(6).max(14),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
  return next();
};

export const loginValidate = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).max(14),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
  return next();
};
