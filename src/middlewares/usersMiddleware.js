import * as responses from "../helpers/responseHelpers.js";
import * as userReposistory from "../repositories/usersRepository.js";
import { signUpValidation, signInValidation } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";

export async function signUpMiddleware(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signUpValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return responses.unprocessableResponse(res, errors);
  }

  if (password !== confirmPassword)
    return responses.unprocessableResponse(res, "senhas não coincidem!");

  try {
    const userExists = await userReposistory.getUserData(email);

    if (userExists.rowCount !== 0)
      return responses.conflictResponse(res, "usuário já cadastrado!");

    next();
  } catch (error) {
    return responses.serverError(res, error);
  }
}

export async function signInMiddleware(req, res, next) {
  const { email, password } = req.body;

  const validation = signInValidation.validate(req.body, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((error) => error.message);
    return responses.unprocessableResponse(res, errors);
  }

  try {
    const userExists = await userReposistory.getUserData(email);
    if (
      userExists.rowCount === 0 ||
      !bcrypt.compareSync(password, userExists.rows[0].password)
    )
      return responses.unauthorizedResponse(res, "usuário e/ou senha inválida!");

    next();
  } catch (error) {
    return responses.serverError(res, error);
  }
}
