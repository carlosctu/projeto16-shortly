export function unprocessableResponse(res, error) {
  return res.status(422).send(error);
}

export function serverError(res, error) {
  console.log(error);
  return res.sendStatus(500);
}
export function unauthorizedResponse(res, error) {
  return res.status(401).send(error);
}

export function conflictResponse(res, error) {
  console.log(error);
  res.sendStatus(409);
}

export function notFoundResponse(res) {
  res.sendStatus(404);
}

export function okResponse(res, body) {
  return res.status(200).send(body);
}

export function createdResponse(res) {
  return res.sendStatus(201);
}

export function deletedResponse(res) {
  return res.sendStatus(204);
}

export function createdResponseWithBody(res, body) {
  return res.status(201).send(body);
}
