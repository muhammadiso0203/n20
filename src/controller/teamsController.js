import { mongoose } from "mongoose";
import { team } from "../models/index.js";

export const teamsController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneTeam = await team.findById(id);

      if (!oneTeam) return res.status(404).json(`Team not found`);

      res.json(oneTeam);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allTeams = await team.find();

      if (allTeams.length === 0)
        return res.status(404).send(`Teams not found`);

      res.json(allTeams);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { team_name, club_id, group_id, coach_name } = req.body;

      if (!team_name || !club_id || !group_id || !coach_name) {
        return res.status(400).send(`All data is required`);
      }

      const newTeam = new team({
        team_name,
        club_id,
        group_id,
        coach_name,
      });

      const savedteam = await newTeam.save();
      res.status(201).json(savedteam);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { team_name, club_id, group_id, coach_name } = req.body;

    try {
      if (!team_name && !club_id && !group_id && !coach_name) {
        return res.status(400).send(`At least one data is required`);
      }

      const updatedTeam = await team.findByIdAndUpdate(
        id,
        { team_name, club_id, group_id, coach_name },

        {
          new: true,
        }
      );

      if (!updatedTeam) return res.status(404).json(`Team not found`);

      res.json(updatedTeam);
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

      const deletedTeam = await team.deleteOne({ _id: id });

      if (!deletedTeam) return res.status(404).json(`Team not found`);

      res.json(`Team successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
