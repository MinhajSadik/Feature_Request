import Joi from "joi";
Joi.objectId = require("joi-objectid")(Joi);

export const featureSchemaValidate = (req, res, next) => {
  const schema = {
    title: Joi.string().required(),
    description: Joi.string().required(),
    logo: Joi.string().required(),
    status: Joi.boolean().required(),
  };

  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  return next();
};
