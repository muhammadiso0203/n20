import mongoose, { now } from "mongoose";
import {
  tournamenGroupsCollectionName,
  tournamentsCollectionName,
} from "../common/index.js";

const tournamentGroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: tournamentsCollectionName,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const tournamentGroup = mongoose.model(
  tournamenGroupsCollectionName,
  tournamentGroupSchema
);
