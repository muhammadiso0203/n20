import { mongoose } from "mongoose";
import { tournaments } from "../models/index.js";

export const tournamentsController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneTournament = await tournaments.findById(id);

      if (!oneTournament) return res.status(404).json(`Tournament not found`);

      res.json(oneTournament);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allTournaments = await tournaments.find();

      if (allTournaments.length === 0)
        return res.status(404).send(`Tournaments not found`);

      res.json(allTournaments);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { tournament_name, start_date, end_date, status } = req.body;

      if (!tournament_name || !start_date || !end_date || !status) {
        return res.status(400).send(`All data is required`);
      }

      const newTournament = new tournaments({
        tournament_name,
        start_date,
        end_date,
        status,
      });

      const savedTournament = await newTournament.save();
      res.status(201).json(savedTournament);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { tournament_name, start_date, end_date, status } = req.body;

    try {
      if (!tournament_name && !start_date && !end_date && !status) {
        return res.status(400).send(`At least one data is required`);
      }

      const updatedTournament = await tournaments.findByIdAndUpdate(
        id,
        { tournament_name, start_date, end_date, status },

        {
          new: true,
        }
      );

      if (!updatedTournament)
        return res.status(404).json(`Tournament not found`);

      res.json(updatedTournament);
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

      const deletedTournament = await tournaments.deleteOne({
        _id: id,
      });

      if (!deletedTournament)
        return res.status(404).json(`Tournament not found`);

      res.json(`Tournament successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
