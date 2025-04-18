import { generateToken } from "../library/index.js";
import { User } from "../models/index.js";

export const authController = {
  signUp: async (req, res, next) => {
    try {
      const { full_name, email, password } = req.body;

      if (!full_name || !email || !password)
        return res.status(400).json({ message: "All data is required" });

      const user = await User.findOne(
        { email: email },
        "email _id"
      ).exec();

      if (user) {
        return res.status(409).send("User already exists!;");
      }

      const newUser = new User({ full_name, email, password });

      await newUser.save();
      res.status(201).json({ full_name, email });
    } catch (err) {
      next(err);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await user.isValidPassword(password);

      if (!isMatch)
        return res.status(400).json({ message: `Invalid credentials` });

      const payload = {
        sub: user._id,
        name: user.full_name,
      };

      const token = generateToken(payload);

      res.status(200).json({ message: "ok", token });
    } catch (err) {
      next(err);
    }
  },

  profile: (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ message: "User not found" });

      res.status(200).json(req.user);
    } catch (error) {
      next(error);
    }
  },
};
