import Joi from "joi";

export const featureSchemaValidate = (req, res, next) => {
  const { data } = req.body;
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    logo: Joi.string().required(),
  });

  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.message,
    });
  }
  return next();
};
