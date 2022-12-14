import joi from "joi";

export const signUpValidation = joi.object({
  name: joi.string().max(50).required(),
  email: joi.string().max(80).required(),
  password: joi.string().max(255).required(),
  confirmPassword: joi.string().max(255).required(),
});

export const signInValidation = joi.object({
  email: joi.string().max(50).required(),
  password: joi.string().max(255).required(),
});
