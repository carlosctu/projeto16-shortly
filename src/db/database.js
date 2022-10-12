import pg from "pg";
import dotenv from "dotenv";

const { Pool } = pg;
dotenv.config();

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "shortly",
});

export default connection;
