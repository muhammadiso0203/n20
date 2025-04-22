import mongoose, { model, Schema } from "mongoose";

const carSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plateNumber: {
      type: String,
      trim: true,
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Car = model("Car", carSchema);
