import { User } from "../model/index.js";
import { generateToken, hashPassword, verifyPassword } from "../utils/index.js";

export const userController = {
  signUp: async (req, res, next) => {
    try {
      const { fullname, email, password, role } = req.body;

      const existing = await User.findOne({ email });

      if (existing) {
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = hashPassword(password);

      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      res.status(201).json({
        message: "ok",
        user: {
          fullname,
          email,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const existing = await User.findOne({ email });

      if (!existing) {
        return res.status(401).json({ message: "User not found" });
      }

      const hashPassword = verifyPassword(password);

      if (!hashPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = generateToken(existing._id);

      res.status(200).json({ message: "ok", token });
    } catch (error) {
      next(error);
    }
  },
};
