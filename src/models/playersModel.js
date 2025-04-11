import mongoose from "mongoose";
import { playersCollectionName } from "../common/index.js";

const playerSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  position: {
    type: String,
    required: true,
    maxlength: 50,
  },
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  jersey_number: {
    type: Number,
    required: true,
  },
});

export const Player = mongoose.model(playersCollectionName, playerSchema);
