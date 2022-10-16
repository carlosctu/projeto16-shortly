import connection from "../db/database.js";

export async function listUserUrls(userId, sessionId) {
  const userUrls = await connection.query(
    `SELECT u.id, u.name, SUM(ur."visitCount") AS "visitCount",
    json_agg(json_build_object('id', ur.id, 'shortUrl',
    ur."shortUrl", 'url', ur.url, 'visitCount', ur."visitCount")) AS "shortenedUrls"
    FROM urls ur
    INNER JOIN sessions s ON s."userId" = ur."userId"
    INNER JOIN users u ON u.id = ur."userId"
    WHERE u.id = $1 AND s.id = $2
    GROUP BY u.id;
    `,
    [userId, sessionId]
  );
  return userUrls.rows[0];
}
