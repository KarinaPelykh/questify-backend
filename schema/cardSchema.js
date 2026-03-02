const Joi = require("joi");

const cardSchema = Joi.object({
  category: Joi.string().required(),
  status: Joi.string.require(),
  date: Joi.string.require(),
  quest: Joi.string.require(),
});

module.exports = cardSchema;
