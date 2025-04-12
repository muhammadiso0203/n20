import mongoose from "mongoose";
import { collections } from "../common/index.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.category,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model(collections.product, productSchema);
