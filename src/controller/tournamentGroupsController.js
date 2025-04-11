import { mongoose } from "mongoose";
import { tournamentGroup } from "../models/index.js";

export const tournamentGroupController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneTournamentGroup = await tournamentGroup.findById(id);

      if (!oneTournamentGroup) return res.status(404).json(`Team not found`);

      res.json(oneTournamentGroup);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allTournamentGroups = await tournamentGroup.find();

      if (allTournamentGroups.length === 0)
        return res.status(404).send(`Tournament Groups not found`);

      res.json(allTournamentGroups);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { group_name, tournament_id } = req.body;

      if (!group_name || !tournament_id) {
        return res.status(400).send(`All data is required`);
      }

      const newTournamentGroup = new tournamentGroup({
        group_name,
        tournament_id,
      });

      const savedTournamentGroup = await newTournamentGroup.save();
      res.status(201).json(savedTournamentGroup);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { group_name, tournament_id } = req.body;

    try {
      if (!group_name && !tournament_id) {
        return res.status(400).send(`At least one data is required`);
      }

      const updatedTournamentGroup = await tournamentGroup.findByIdAndUpdate(
        id,
        { group_name, tournament_id },

        {
          new: true,
        }
      );

      if (!updatedTournamentGroup)
        return res.status(404).json(`Tournament Group not found`);

      res.json(updatedTournamentGroup);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).json(`ID is required`);
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid ID format");
      }

      const deletedTournamentGroup = await tournamentGroup.deleteOne({
        _id: id,
      });

      if (!deletedTournamentGroup)
        return res.status(404).json(`Tournament Group not found`);

      res.json(`Tournament Group successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
