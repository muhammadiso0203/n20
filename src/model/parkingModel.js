import mongoose, { model, Schema } from "mongoose";

const parkingSchema = new Schema(
  {
    location: {
      type: String,
      required: true,
    },
    slotNumber: {
      type: Number,
      trim: true,
      required: true,
    },
    isBooked: {
      type: Boolean,
      trim: true,
      required: true,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    bookedAt: {
      type: Date,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

export const Parking = model("Parking", parkingSchema);
