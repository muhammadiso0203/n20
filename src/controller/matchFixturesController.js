import { matchFixture } from "../models/index.js";

export const matchFixturesController = {
  findOne: async (req, res, next) => {
    const { id } = req.params;
    try {
      const oneMatchFixture = await matchFixture.findById(id);

      if (!oneMatchFixture)
        return res.status(404).json(`FMatch Fixture not found`);

      res.json(oneMatchFixture);
    } catch (error) {
      next(error);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const allMatchFixture = await matchFixture.find();
      res.json(allMatchFixture);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const {
        match_date,
        venue,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        tournament_id,
        match_status,
      } = req.body;

      if (
        !match_date ||
        !venue ||
        !home_team_id ||
        !away_team_id ||
        !home_score ||
        !away_score ||
        !tournament_id ||
        !match_status
      ) {
        return res.status(400).send(`All data is required`);
      }

      const newMatchFixture = new matchFixture({
        match_date,
        venue,
        home_team_id,
        away_team_id,
        home_score,
        away_score,
        tournament_id,
        match_status,
      });

      const savedMatchFixture = await newMatchFixture.save();
      res.status(201).json(savedMatchFixture);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;
    const {
      match_date,
      venue,
      home_team_id,
      away_team_id,
      home_score,
      away_score,
      tournament_id,
      match_status,
    } = req.body;

    try {
      if (
        !match_date &&
        !venue &&
        !home_team_id &&
        !away_team_id &&
        !home_score &&
        !away_score &&
        !tournament_id &&
        !match_status
      ) {
        return res.status(400).send(`At least one data is required`);
      }

      const updatedMatchFixture = await matchFixture.findByIdAndUpdate(
        id,
        {
          match_date,
          venue,
          home_team_id,
          away_team_id,
          home_score,
          away_score,
          tournament_id,
          match_status,
        },

        {
          new: true,
        }
      );

      if (!updatedMatchFixture)
        return res.status(404).json(`Match Fixture not found`);

      res.json(updatedMatchFixture);
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

      const deletedMatchFixture = await matchFixture.deleteOne({ _id: id });

      if (!deletedMatchFixture)
        return res.status(404).json(`Match Fixture not found`);

      res.json(`Match Fixture successfully deleted`);
    } catch (error) {
      next(error);
    }
  },
};
