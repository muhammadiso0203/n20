import { Pool } from "pg";
import { config } from "dotenv";
config();
import { join } from "node:path";
import { readFileSync } from "node:fs";

export const db = new Pool({
  connectionString: process.env.DB,
});

export const pgConnect = async () => {
  try {
    const pathFile = join("src/config/init.sql");
    const sql = readFileSync(pathFile, "utf8");

    await db.query(sql);
    console.log(`Tables created successfully`);
  } catch (err) {
    console.error(`Error creating tables:`, err.message);
  }
};
