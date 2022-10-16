import * as response from "../helpers/responseHelpers.js";
import { listUserUrls } from "../repositories/userRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

async function list(req, res) {
  const token = res.locals.token;
  try {
    const session = await sessionRepository.getSessionData(token);
    if (!session) return response.notFoundResponse(res);

    const userUrls = await listUserUrls(session.userId, session.id);
    return response.okResponse(res, userUrls);
  } catch (error) {
    return response.serverError(res, error);
  }
}

export { list };
