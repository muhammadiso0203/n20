import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { mongoConnection } from "./db/index.js";
import { mainRouter } from "./routes/index.js";

const app = express();
const PORT = +process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
await mongoConnection();

app.use("/blog", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port`, PORT));
