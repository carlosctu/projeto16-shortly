import joi from "joi";

export const userValidation = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),
});
