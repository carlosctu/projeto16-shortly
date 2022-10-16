import * as response from "../helpers/responseHelpers.js";
import * as authenticationRepository from "../repositories/authenticationRepository.js";
import { insertToken } from "../repositories/sessionRepository.js";
import bcrypt from "bcrypt";

async function insert(req, res) {
  const { name, email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await authenticationRepository.insertUser(name, email, passwordHash);
    return response.createdResponse(res);
  } catch (error) {
    return response.serverError(res, error);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const userId = (await authenticationRepository.getUserData(email)).rows[0]
      .id;
    const userToken = await insertToken(userId);
    return response.okResponse(res, { token: userToken });
  } catch (error) {
    return response.serverError(res, error);
  }
}

export { insert, login };
