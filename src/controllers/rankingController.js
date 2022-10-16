import * as response from "../helpers/responseHelpers.js";
import * as rankingRepository from "../repositories/rankingRepository.js";

async function list(req, res) {
  try {
    const shortlyRanking = await rankingRepository.getRanking();
    return response.okResponse(res, shortlyRanking);
  } catch (error) {
    return response.serverError(res, error);
  }
}

export { list };
