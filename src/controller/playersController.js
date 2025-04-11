import { mongoose } from "mongoose";
import { player } from "../models/index.js";

export const playersController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const onePlayer = await player.findById(id);

      if (!onePlayer) return res.status(404).json(`Player not found`);

      res.json(onePlayer);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allPlayers = await player.find();

      if (allPlayers.length === 0)
        return res.status(404).send(`Players not found`);

      res.json(allPlayers);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { full_name, date_of_birth, position, team_id, jersey_number } =
        req.body;

      if (
        !full_name ||
        !date_of_birth ||
        !position ||
        !team_id ||
        !jersey_number
      ) {
        return res.status(400).send(`All data is required`);
      }

      const newPlayer = new player({
        full_name,
        date_of_birth,
        position,
        team_id,
        jersey_number,
      });

      const savedNewPlayer = await newPlayer.save();
      res.status(201).json(savedNewPlayer);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { full_name, date_of_birth, position, team_id, jersey_number } =
      req.body;

    try {
      if (
        !full_name &&
        !date_of_birth &&
        !position &&
        !team_id &&
        !jersey_number
      ) {
        return res.status(400).send(`At least one data is required`);
      }

      const updatedPlayer = await player.findByIdAndUpdate(
        id,
        { full_name, date_of_birth, position, team_id, jersey_number },

        {
          new: true,
        }
      );

      if (!updatedPlayer) return res.status(404).json(`Player not found`);

      res.json(updatedPlayer);
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

      const deletedPlayer = await player.deleteOne({ _id: id });

      if (!deletedPlayer) return res.status(404).json(`Player not found`);

      res.json(`Player successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
