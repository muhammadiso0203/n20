import express from "express";

import { pgConnect } from "./config/index.js";
import { mainRouter } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());

app.use("/", mainRouter);

await pgConnect();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
