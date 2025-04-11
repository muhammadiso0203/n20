import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { mongoConnection } from "./db/index.js";

mongoConnection()
dotenv.config();

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
