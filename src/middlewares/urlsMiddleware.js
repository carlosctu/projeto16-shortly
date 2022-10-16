import * as response from "../helpers/responseHelpers.js";
import { urlValidation } from "../schemas/urlSchema.js";
import * as sessionRepository from "../repositories/sessionRepository.js";


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
