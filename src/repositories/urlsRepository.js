import connection from "../db/database.js";

const TABLE = "urls";

export async function insertShortenedUrl(userId, url, shortUrl) {
  await connection.query(
    `INSERT INTO ${TABLE} ("userId", "url", "shortUrl") VALUES ($1, $2, $3);`,
    [userId, url, shortUrl]
  );
}
