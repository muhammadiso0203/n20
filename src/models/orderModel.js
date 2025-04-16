import mongoose from "mongoose";
import { collections } from "../common/index.js";

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      min: 0,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.user,
      required: false,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.product,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model(collections.order, orderSchema);
