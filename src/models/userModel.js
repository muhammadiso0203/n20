import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    decodedPassword: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
