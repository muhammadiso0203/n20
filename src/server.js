import express from "express";
import cors from "cors";

import { mongoConnection } from "./db/index.js";
import {
  AuthRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "./routes/index.js";

mongoConnection();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());

const router = [
  AuthRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
];

app.use("/product", ...router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
