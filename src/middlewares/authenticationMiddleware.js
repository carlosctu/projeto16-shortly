import * as response from "../helpers/responseHelpers.js";
import * as authenticationReposistory from "../repositories/authenticationRepository.js";
import {
  signUpValidation,
  signInValidation,
} from "../schemas/authenticationSchema.js";
import bcrypt from "bcrypt";

export async function signUpMiddleware(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signUpValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return response.unprocessableResponse(res, errors);
  }

  if (password !== confirmPassword)
    return response.unprocessableResponse(res, "senhas não coincidem!");

  try {
    const userExists = await authenticationReposistory.getUserData(email);

    if (userExists.rowCount !== 0)
      return response.conflictResponse(res, "usuário já cadastrado!");

    next();
  } catch (error) {
    return response.serverError(res, error);
  }
}

export async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;

  const validation = signInValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return response.unprocessableResponse(res, errors);
  }

  try {
    const userExists = await authenticationReposistory.getUserData(email);
    if (
      userExists.rowCount === 0 ||
      !bcrypt.compareSync(password, userExists.rows[0].password)
    )
      return response.unauthorizedResponse(
        res,
        "usuário e/ou senha inválida!"
      );

    next();
  } catch (error) {
    return response.serverError(res, error);
  }
}

