const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.featureSchemaValidate = (req, res, next) => {
  const data = req.body;
  const schema = Joi.object().keys({}).unknown(true);
  const { error } = schema.validate(data);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  next();
};
