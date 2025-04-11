import { footballClubs } from "../models/index.js";

export const footballClubsController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneFootballClub = await footballClubs.findById(id);

      if (!oneFootballClub)
        return res.status(404).json(`Football Club not found`);

      res.json(oneFootballClub);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allFootballClubs = await footballClubs.find();
      res.json(allFootballClubs);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { club_name, city, country, founded_year } = req.body;

      if (!club_name || !city || !country || !founded_year) {
        return res.status(400).send(`All data is required`);
      }

      const newFootballClub = new footballClubs({
        club_name,
        city,
        country,
        founded_year,
      });

      const savedFootballClub = await newFootballClub.save();
      res.status(201).json(savedFootballClub);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const { club_name, city, country, founded_year } = req.body;

    try {
      if (!club_name && !city && !country && !founded_year) {
        return res.status(400).send(`At least one data is required `);
      }

      const updatedFootballClub = await footballClubs.findByIdAndUpdate(
        id,
        { club_name, city, country, founded_year },

        {
          new: true,
        }
      );

      if (!updatedFootballClub)
        return res.status(404).json(`Football Club not found`);

      res.json(updatedFootballClub);
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

      const deletedFootballClub = await footballClubs.deleteOne({ _id: id });

      if (!deletedFootballClub)
        return res.status(404).json(`Football Club not found`);

      res.json(`Football Club successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
