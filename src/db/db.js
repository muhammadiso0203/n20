import { connect } from "mongoose";

export const mongoConnection = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(`Mongo connected successfully`);
  } catch (error) {
    console.error(`Error in connecting mongo:`, error.message);
  }
};
