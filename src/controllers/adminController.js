import bcrypt from "bcrypt";

import { Admin } from "../models/index.js";

export const seedSuperAdmin = async () => {
  try {
    const existing = await Admin.findOne({ username: "superadmin" });

    if (existing) {
      console.log("⚠️ Superadmin already exists");
      return;
    }

    const superAdmin = new Admin({
      username: "Superadmin",
      password: "conscious777",
      role: "superadmin",
    });

    await superAdmin.save();
  } catch (error) {
    console.error("Error in creating superadmin:", error.message);
  }
};

export const adminController = {
  find: async (req, res, next) => {
    try {
      const allAdmins = await Admin.find();

      res.status(200).json(allAdmins);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { username, password, role } = req.body;

      const existing = await Admin.findOne({ username });

      if (existing)
        return res.status(409).json({ message: "Admin already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        username,
        password: hashedPassword,
        role,
      });

      await newAdmin.save();

      res.status(201).json({
        message: `${role} created successfully`,
        admin: {
          id: newAdmin._id,
          username: newAdmin.username,
          role: newAdmin.role,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { username, role } = req.body;

      const existing = await Admin.findOne({ username });

      if (!existing)
        return res.status(404).json({ message: "Admin not found" });

      if (
        req.user.role !== "superadmin" &&
        existing._id.toString() !== req.user._id
      )
        return res.status(403).json({ message: "Access denied" });

      await Admin.updateOne({ username }, { role });

      res.status(200).json({
        message: "Admin successfully updated",
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { username } = req.body;

      const existing = await Admin.findOne({ username });

      if (!existing) {
        return res.status(404).json({ message: `Admin not found` });
      }

      await existing.deleteOne();
      res.status(200).json({ message: "Admin successfully deleted" });
    } catch (error) {
      next(error);
    }
  },
};
