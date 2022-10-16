import * as response from "../helpers/responseHelpers.js";
import { urlValidation } from "../schemas/urlSchema.js";
import * as sessionRepository from "../repositories/sessionRepository.js";
import validator from "validator";

export async function authenticationMiddleware(req, res, next) {
  let token = req.headers.authorization;

  if (!token || !token.includes("Bearer"))
    return response.unauthorizedResponse(res, "Token inválida!");

  token = token.replace("Bearer ", "");

  if (!validator.isUUID(token))
    return response.unauthorizedResponse(
      res,
      "Token precisa estar no formato UUID"
    );

  res.locals.token = token;
  next();
}

export async function shortenUrlMiddleware(req, res, next) {
  const validation = urlValidation.validate(req.body, { abortEarly: false });
  const token = res.locals.token;

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return response.unprocessableResponse(res, errors);
  }

  try {
    const session = await sessionRepository.getSessionData(token);
    if (!session)
      return response.unauthorizedResponse(res, "Sessão não existe!");

    res.locals.userId = session.userId;
    next();
  } catch (error) {
    return response.serverError(res, error);
  }
}
