const Joi = require('joi');

const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().required(),
});

module.exports = bookValidationSchema;
