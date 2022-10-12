import connection from "../db/database.js";
import { createdResponse, serverError } from "./helpers/controllerHelpers.js";
import bcrypt from "bcrypt";
const TABLE = "users";

async function insert(req, res) {
  const { name, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 10);

  try {
    await connection.query(
      `INSERT INTO ${TABLE} (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordHash]
    );
    return createdResponse(res, { name, email, passwordHash });
  } catch (error) {
    return serverError(res, error);
  }
}

export { insert };
