import mongoose from "mongoose";
import { matchFixturesCollectionName } from "../common/index.js";

const matchFixtureSchema = new mongoose.Schema({
  match_date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    maxlength: 50,
  },
  home_team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  away_team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  home_score: {
    type: Number,
    required: true,
  },
  away_score: {
    type: Number,
    required: true,
  },
  tournament_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  match_status: {
    type: String,
    required: true,
    maxlength: 30,
  },
});

export const matchFixture = mongoose.model(
  matchFixturesCollectionName,
  matchFixtureSchema
);
