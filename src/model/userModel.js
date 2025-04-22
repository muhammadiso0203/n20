import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);

