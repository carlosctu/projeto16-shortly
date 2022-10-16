import { v4 as uuidv4 } from "uuid";
import connection from "../db/database.js";

const TABLE = "sessions";

export async function insertToken(userId) {
  const token = uuidv4();
  await connection.query(
    `INSERT INTO ${TABLE} (token, "userId") VALUES ($1, $2);`,
    [token, userId]
  );
  return token;
}

export async function getSessionData(token) {
  const sessionData = await (
    await connection.query(`SELECT * FROM ${TABLE} WHERE token = $1;`, [token])
  ).rows[0];

  return sessionData;
}
