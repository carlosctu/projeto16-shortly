import joi from "joi";

export const urlValidation = joi.object({
  url: joi.string().uri().required(),
});
