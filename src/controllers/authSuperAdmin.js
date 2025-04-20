import { generateToken } from "../library/index.js";
import { Admin } from "../models/index.js";

export const authSuperAdminController = {
  signIn: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const superAdmin = await Admin.findOne({ username });

      if (!superAdmin) {
        return res.status(401).json({ message: "Super admin not found" });
      }

      if (password !== superAdmin.password) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const payload = {
        sub: superAdmin._id,
        username: superAdmin.username,
        role: superAdmin.role,
      };

      const token = generateToken(payload);

      res.status(200).json({ message: "ok", token });
    } catch (error) {
      next(error);
    }
  },

  profile: async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const superAdmin = await Admin.findOne({ username });

      if (!superAdmin)
        return res.status(401).json({ message: "Super admin not found" });

      const isMatch = await superAdmin.isValidPassword(password);

      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      res.status(200).json({ message: "ok", superAdmin: superAdmin });
    } catch (error) {
      next(error);
    }
  },
};
