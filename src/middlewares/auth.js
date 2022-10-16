import * as response from "../helpers/responseHelpers.js";
import validator from "validator";

export async function authentication(req, res, next) {
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
