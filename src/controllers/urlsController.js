import { nanoid } from "nanoid";
import * as responses from "../helpers/responseHelpers.js";
import * as urlsRepository from "../repositories/urlsRepository.js";

async function createShortenUrl(req, res) {
  const { url } = req.body;
  const userId = res.locals.userId;
  const shortenedUrl = nanoid(8);
  try {
    await urlsRepository.insertShortenedUrl(userId, url, shortenedUrl);
    return responses.createdResponseWithBody(res, { shortUrl: shortenedUrl });
  } catch (error) {
    return responses.serverError(res, error);
  }
}

export { createShortenUrl };
