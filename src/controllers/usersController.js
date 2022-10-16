import * as responses from "../helpers/responseHelpers.js";
import * as usersRepository from "../repositories/usersRepository.js";
import { insertToken } from "../repositories/sessionRepository.js";
import bcrypt from "bcrypt";

async function insert(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await usersRepository.insertUser(name, email, passwordHash);
    return responses.createdResponse(res);
  } catch (error) {
    return responses.serverError(res, error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const userId = (await usersRepository.getUserData(email)).rows[0].id;
    const userToken = await insertToken(userId);
    return responses.okResponse(res, { token: userToken });
  } catch (error) {
    return responses.serverError(res, error);
  }
}

export { insert, login };
