const Joi = require("joi");

const userSignUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const userSignInSchema = Joi.object({
  email: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

module.exports = { userSignUpSchema, userSignInSchema };
