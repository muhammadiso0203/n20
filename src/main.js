import express from "express";
import config from "./config/index.js";
import db from "./models/index.js";
import { categoryRouter, productRouter } from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/category", categoryRouter);
app.use("/product", productRouter);

db.sequelize
  .sync({ force: false })
  .then(() => console.log(`PG connected successfully`));

app.listen(config.PORT, () =>
  console.log(`Server is running on port`, +config.PORT)
);
