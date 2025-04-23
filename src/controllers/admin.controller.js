import { Admin, User } from "../models/index.js";
import {
  catchError,
  decode,
  encode,
  adminValidator,
  generateToken,
} from "../utils/index.js";

export class AdminController {
  async signUpSuperAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        return res.status(400).json({
          statusCode: 400,
          message: `Error in signing up superadmin`,
        });
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ role: "superadmin" });

      if (existing) {
        return res.status(409).json({
          statusCode: 409,
          message: `${existing.role} already exists`,
        });
      }

      const decodedPassword = await decode(password);

      const newSuperAdmin = new Admin({
        username,
        email,
        decodedPassword,
        role: "superadmin",
      });
      await newSuperAdmin.save();

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        superadmin: {
          username,
          email,
        },
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async signUpAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        return res.status(400).json({
          statusCode: 400,
          message: `Error in signing up admin`,
        });
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ username });

      if (existing) {
        return res.status(409).json({
          statusCode: 409,
          message: `${existing.role} already exists`,
        });
      }

      const decodedPassword = await decode(password);

      const newAdmin = new Admin({
        username,
        email,
        decodedPassword,
        role: "admin",
      });
      await newAdmin.save();

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        admin: {
          username,
          email,
        },
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async signInAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await Admin.findOne({ email });

      if (!existing) {
        return res.status(404).json({ message: `Admin not found` });
      }

      const encodedPassword = await encode(password, existing.decodedPassword);

      if (!encodedPassword) {
        return res
          .status(400)
          .json({ message: `Error in encoding admin password` });
      }

      const payload = {
        sub: existing._id,
        role: existing.role,
      };

      const token = generateToken(payload);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        token,
      });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllAdmins(__, res) {
    try {
      const admins = await Admin.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allAdmins: admins });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllUsers(__, res) {
    try {
      const users = await User.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allUsers: users });
    } catch (error) {
      catchError(error, res);
    }
  }

  async updateAdminById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ statusCode: 400, message: `ID not found` });
      }
      const body = req.body;

      const existingAdmin = await Admin.findByIdAndUpdate(id, body);

      if (!existingAdmin) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Admin not found" });
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully updated" });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAdminById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ statusCode: 400, message: `ID not found` });
      }

      const existingAdmin = await Admin.findById(id);

      if (!existingAdmin) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "Admin not found" });
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", admin: existingAdmin });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ statusCode: 400, message: `ID not found` });
      }

      const existingUser = await User.findById(id);
      
      if (!existingUser) {
        return res
          .status(404)
          .json({ statusCode: 404, message: "User not found" });
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", user: existingUser });
    } catch (error) {
      catchError(error, res);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ statusCode: 400, message: `ID not found` });
      }

      await Admin.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully deleted" });
    } catch (error) {
      catchError(error, res);
    }
  }
}
