import * as response from "../helpers/responseHelpers.js";
import { urlValidation } from "../schemas/urlSchema.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

export async function shortenUrlMiddlware(req, res, next) {
  const validation = urlValidation.validate(req.body, { abortEarly: false });
  let token = req.headers.authorization;

  if (!token || !token.includes("Bearer"))
    return response.unauthorizedResponse(res, "Token inválida!");

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return response.unprocessableResponse(res, errors);
  }

  try {
    token = token.replace("Bearer ", "");
    const session = await sessionRepository.getSessionToken(token);

    if (!session)
      return response.unauthorizedResponse(res, "Sessão não existe!");

    res.locals.userId = session.userId;
    next();
  } catch (error) {
    return response.serverError(res, error);
  }
}
