import express from "express";

import { pgConnection } from "./config/index.js";
import { mainRouter } from "./router/index.js";

await pgConnection();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

app.use("/", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port`, PORT));
