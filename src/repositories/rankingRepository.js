import connection from "../db/database.js";

export async function getRanking() {
  const userUrls = await connection.query(
    `SELECT u.id, u.name, COUNT(ur."userId") AS "linksCount",
    SUM(ur."visitCount")::INTEGER AS "visitCount" FROM users u
    LEFT JOIN urls ur ON u.id = ur."userId"
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10;
    `,
    []
  );
  return userUrls.rows;
}
