import {
  conflictResponse,
  serverError,
  unprocessableResponse,
} from "../controllers/helpers/controllerHelpers.js";
import connection from "../db/database.js";
import { userValidation } from "../schemas/userSchema.js";

export async function userMiddleware(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = userValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return unprocessableResponse(res, errors);
  }

  if (password !== confirmPassword)
    return unprocessableResponse(res, "senhas não coincidem!");

  try {
    const userExists = await connection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rowCount !== 0)
      return conflictResponse(res, "usuário já cadastrado!");

    next();
  } catch (error) {
    return serverError(res, error);
  }
}
