import { connect } from "mongoose";

export const mongoConnection = () => {
  connect(process.env.MONGO_URL)
    .then(() => console.log(`Mongo connected successfully`))
    .catch((err) => {
      console.error(`Mongo connection error:`, err);
    });
};
