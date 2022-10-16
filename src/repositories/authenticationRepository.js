import connection from "../db/database.js";

const TABLE = "users";

async function getUserData(email) {
  const userExists = await connection.query(
    `SELECT * FROM ${TABLE} WHERE email = $1;`,
    [email]
  );
  return userExists;
}

async function insertUser(name, email, passwordHash) {
  await connection.query(
    `INSERT INTO ${TABLE} (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, passwordHash]
  );
}

export { insertUser, getUserData };
