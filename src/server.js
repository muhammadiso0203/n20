import express from "express";

import { mongoConnection } from "./db/index.js";
import { mainRouter } from "./routes/index.js";

const app = express();
const PORT = +process.env.PORT;

// middleware
app.use(express.json());
await mongoConnection();

app.use("/blog", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port`, PORT));
