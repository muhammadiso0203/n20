import { User } from "../models/index.js";

export const userController = {
  profile: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(401).json({ message: "User not found" });

      const isMatch = await user.isValidPassword(password);

      if (!isMatch)
        return res.status(401).json({ message: `Invalid credentials` });

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "ID is required" });

    try {
      const { full_name, email, password } = req.body;

      const user = await User.findByIdAndUpdate(id, {
        full_name,
        email,
        password,
      });

      if (!user) return res.status(401).json({ message: "User not found" });

      res.status(200).json({ message: "User successfully updated" });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "ID is required" });

    try {
      const user = await User.findByIdAndDelete(id);

      if (!user) return res.status(401).json({ message: "User not found" });

      res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
