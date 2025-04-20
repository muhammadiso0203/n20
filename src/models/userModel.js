import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { collections } from "../common/index.js";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      trim: true,
      lower: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lower: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 5,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export const User = mongoose.model(collections.user, userSchema);
