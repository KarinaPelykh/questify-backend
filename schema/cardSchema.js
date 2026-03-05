const Joi = require("joi");

const cardSchema = Joi.object({
  category: Joi.string().required(),
  status: Joi.string().required(),
  date: Joi.string().required(),
  quest: Joi.string().required(),
});

module.exports = cardSchema;
