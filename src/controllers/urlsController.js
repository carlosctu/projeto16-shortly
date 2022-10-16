import { nanoid } from "nanoid";
import * as response from "../helpers/responseHelpers.js";
import { getSessionData } from "../repositories/sessionRepository.js";
import * as urlsRepository from "../repositories/urlsRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";

async function createShortenUrl(req, res) {
  const { url } = req.body;
  const userId = res.locals.userId;
  const shortenedUrl = nanoid(8);
  try {
    await urlsRepository.insertShortenedUrl(userId, url, shortenedUrl);
    return response.createdResponseWithBody(res, { shortUrl: shortenedUrl });
  } catch (error) {
    return response.serverError(res, error);
  }
}

async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const urlData = await urlsRepository.getUrl("id", id);
    if (!urlData) return response.notFoundResponse(res);

    return response.okResponse(res, {
      id: urlData.id,
      shortUrl: urlData.shortUrl,
      url: urlData.url,
    });
  } catch (error) {
    return response.serverError(res, error);
  }
}

async function openUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const urlData = await urlsRepository.getUrl("shortUrl", shortUrl);
    if (!urlData) return response.notFoundResponse(res);

    await urlsRepository.updateVisitCount(urlData.visitCount + 1, urlData.id);
    return res.redirect(urlData.url);
  } catch (error) {
    return response.serverError(res, error);
  }
}

async function deleteUrl(req, res) {
  const { id } = req.params;
  const token = res.locals.token;
  try {
    const urlExists = await urlsRepository.getUrl("id", id);
    if (!urlExists) return response.notFoundResponse(res);

    const sessionData = await sessionRepository.getSessionData(token);
    const userHasUrl = await urlsRepository.verifyUserUrls(
      id,
      sessionData.userId
    );

    if (!userHasUrl)
      return response.unauthorizedResponse(
        res,
        "URL não pertence ao usuário!"
      );

    await urlsRepository.deleteUrl(id);
    return response.deletedResponse(res);
  } catch (error) {
    return response.serverError(res, error);
  }
}

export { createShortenUrl, getUrl, openUrl, deleteUrl };
