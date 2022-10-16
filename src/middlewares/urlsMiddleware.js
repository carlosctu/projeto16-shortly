import * as response from "../helpers/responseHelpers.js";
import { urlValidation } from "../schemas/urlSchema.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

export async function shortenUrlMiddlware(req, res, next) {
  const validation = urlValidation.validate(req.body, { abortEarly: false });
  
  const token = req.headers.authorization?.replace("Bearer ", "");
  console.log(token);

  if (!token || !token.includes("Bearer"))
    return response.unauthorizedResponse(res, "Token inválida!");

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return response.unprocessableResponse(res, errors);
  }

  try {
    const session = await sessionRepository.getSessionToken(token);
    if (!session)
      return response.unauthorizedResponse(res, "Sessão não existe!");
  } catch (error) {
    return response.serverError(res, error);
  }

  return res.sendStatus(201);
  next();
}
