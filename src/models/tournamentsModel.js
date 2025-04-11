import mongoose from "mongoose";
import { tournamentsCollectionName } from "../common/index.js";

const tournamentSchema = new mongoose.Schema({
  tournament_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

export const tournaments = mongoose.model(
  tournamentsCollectionName,
  tournamentSchema
);
