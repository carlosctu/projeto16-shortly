import connection from "../db/database.js";

const TABLE = "urls";

export async function insertShortenedUrl(userId, url, shortUrl) {
  await connection.query(
    `INSERT INTO ${TABLE} ("userId", "url", "shortUrl") VALUES ($1, $2, $3);`,
    [userId, url, shortUrl]
  );
}

export async function getUrl(column, value) {
  const urlData = await connection.query(
    `SELECT * FROM ${TABLE} WHERE "${column}" = $1;`,
    [value]
  );
  return urlData.rows[0];
}

export async function updateVisitCount(visits, id) {
  await connection.query(
    `UPDATE ${TABLE} SET "visitCount" = $1 WHERE id = $2;`,
    [visits, id]
  );
}

export async function deleteUrl(id) {
  await connection.query(`DELETE FROM ${TABLE} WHERE id = $1;`, [id]);
}

export async function verifyUserUrls(id, userId) {
  const userHasUrl = await connection.query(
    `SELECT * FROM ${TABLE} u
    INNER JOIN sessions s ON s."userId" = u."userId"
    WHERE u.id = $1 AND u."userId" = $2 LIMIT 1;`,
    [id, userId]
  );
  return userHasUrl.rows[0];
}
