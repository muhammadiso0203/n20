import { config } from 'dotenv';
config();

export default {
  PORT: Number(process.env.PORT),
  BOT_TOKEN: String(process.env.BOT_TOKEN),
};
