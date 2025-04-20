import { generateToken } from "../library/index.js";
import { Admin } from "../models/index.js";

export const authAdminController = {
  signUp: async (req, res, next) => {
    try {
      const { username, password, role } = req.body;

      const admin = await Admin.findOne({ username });

      if (admin) {
        return res.status(409).json({ message: "Admin already exists" });
      }

      const newAdmin = new Admin({
        username,
        password,
        role,
      });

      await newAdmin.save();

      res.status(201).json({
        message: `Role ${role} created successfully`,
        admin: {
          username,
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const admin = await Admin.findOne({ username });

      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      const isMatch = await admin.isValidPassword(password);

      if (!isMatch) {
        return res.status(403).json({ message: "Access denied" });
      }

      const payload = {
        sub: admin._id,
        username: admin.username,
        role: admin.role,
      };

      const token = generateToken(payload);
      res.status(200).json({ message: "ok", token });
    } catch (error) {
      next(error);
    }
  },

  profile: () => {},
};
