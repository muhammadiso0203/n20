import bcrypt from "bcrypt"
import { Schema, model } from "mongoose";

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
  },
});

adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

export const Admin = model("Admin", adminSchema);
