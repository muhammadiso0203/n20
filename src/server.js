import express from "express";
import cors from "cors";

import { mongoConnection } from "./db/index.js";
import { mainRouter } from "./routes/index.js";

await mongoConnection();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

app.use("/product", mainRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
