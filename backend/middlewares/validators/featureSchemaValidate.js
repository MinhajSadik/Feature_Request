import Joi from "joi";

export const featureSchemaValidate = (req, res, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    logo: Joi.string().required(),
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
