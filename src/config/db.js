import { Pool } from "pg";
import { config } from "dotenv";
config()

export const connection = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  database: process.env.PG_DB,
  password: process.env.PG_PASS,
});

export const pgConnection = async () => {
  await connection
    .connect()
    .then(() => console.log(`PG connected`))
    .catch((err) => console.error(`Error in connecting pg:`, err));
};
