import {
  conflictResponse,
  serverError,
  unprocessableResponse,
} from "../controllers/helpers/controllerHelpers.js";
import connection from "../db/database.js";
import { signupValidation, signinValidation } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signinMiddleware(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signupValidation.validate(req.body, { abortEarly: false });

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

export async function signupMiddleware(req, res, next) {
  const { email, password } = req.body;

  try {
    const userExists = await connection.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );

    if (
      userExists.rowCount === 0 ||
      !bcrypt.compareSync(password, userExists.rows[0])
    ) {
      return unauthorizedResponse(res, "usuário e/ou senha inválida!");
    }
    next();
    // vai no outroconst token = uuidv4();
  } catch (error) {
    return serverError(res, error);
  }
}
