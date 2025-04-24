import { Admin, User } from "../models/index.js";
import {
  catchError,
  decode,
  encode,
  adminValidator,
  generateToken,
  cookie,
} from "../utils/index.js";

export class AdminController {
  async signUpSuperAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        catchError(res, 400, `Error in signing up superadmin`);
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ role: "superadmin" });

      if (existing) {
        catchError(res, 409, "Superadmin already exists");
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
      catchError(res, 500, `Internal server error`);
    }
  }

  async signUpAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        catchError(res, 400, `Error in signing up admin`);
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ username });

      if (existing) {
        catchError(res, 409, "Admin already exists");
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
      catchError(res, 500, `Internal server error`);
    }
  }

  async signInAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await Admin.findOne({ email });

      if (!existing) {
        catchError(res, 404, `Admin not found`);
      }

      const encodedPassword = await encode(password, existing.decodedPassword);

      if (!encodedPassword) {
        catchError(res, 400, `Error in encoding password`);
      }

      const payload = {
        sub: existing._id,
        role: existing.role,
      };

      const token = generateToken(payload);

      const { accessToken, refreshToken } = token;
      cookie(res, refreshToken);

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        accessToken,
      });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getAllAdmins(__, res) {
    try {
      const admins = await Admin.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allAdmins: admins });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getAllUsers(__, res) {
    try {
      const users = await User.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allUsers: users });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async updateAdminById(req, res) {
    try {
      await this.findAdminById(req.params.id);

      const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });

      if (!admin) {
        catchError(res, 404, `Admin not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully updated" });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getAdminById(req, res) {
    try {
      const admin = await this.findAdminById(req.params.id);

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", admin: admin });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        catchError(res, 400, `ID not found`);
      }

      const existingUser = await User.findById(id);

      if (!existingUser) {
        catchError(res, 404, `User not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", user: existingUser });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const admin = await this.findAdminById(req.params.id);

      if (admin.role === "superadmin") {
        catchError(res, 400, `Danggg Super admin cannot be deleted`);
      }
      await Admin.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully deleted" });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async findAdminById(id) {
    try {
      if (!id) {
        catchError(res, 400, `ID not found`);
      }
      const admin = await Admin.findById(id);

      if (!admin) {
        catchError(res, 404, `Admin not found by ${id}`);
      }
      return admin;
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }
}
