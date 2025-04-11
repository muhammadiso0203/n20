import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { mongoConnection } from "./db/index.js";
import { errorHandler } from "./middleware/index.js";
import {
  footballClubsRouter,
  matchFixturesRouter,
  playersRouter,
  teamsRouter,
  tournamentGroupsRouter,
  tournamentsRouter,
} from "./router/index.js";

mongoConnection();
dotenv.config();

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

const router = [
  footballClubsRouter,
  matchFixturesRouter,
  playersRouter,
  teamsRouter,
  tournamentGroupsRouter,
  tournamentsRouter,
];

app.use("/football", ...router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
