import mongoose from "mongoose";
import { tournamenGroupsCollectionName } from "../common/index.js";

const tournamentGroupSchema = new mongoose.Schema({
  group_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const TournamentGroup = mongoose.model(
  tournamenGroupsCollectionName,
  tournamentGroupSchema
);
