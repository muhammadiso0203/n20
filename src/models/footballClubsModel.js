import mongoose from "mongoose";
import { footballClubsCollectionName } from "../common/index.js";

const footballClubsSchema = new mongoose.Schema({
  club_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  city: {
    type: String,
    required: true,
    maxLength: 50,
  },
  country: {
    type: String,
    required: true,
    maxLength: 50,
  },
  founded_year: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear(),
  },
});

export const footballClubs = mongoose.model(
  footballClubsCollectionName,
  footballClubsSchema
);
