import express from "express";
import cors from "cors";

import { mongoConnection } from "./src/config/index.js";
import { errorHandler } from "./src/middlewares/index.js";

mongoConnection();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
