import mongoose from "mongoose";
import {
  footballClubsCollectionName,
  teamsCollectionName,
  tournamenGroupsCollectionName,
} from "../common/index.js";

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  club_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: footballClubsCollectionName,
    required: true,
  },
  group_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: tournamenGroupsCollectionName,
    required: true,
  },
  coach_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

export const team = mongoose.model(teamsCollectionName, teamSchema);
