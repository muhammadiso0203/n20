import { Admin, User } from "../models/index.js";
import {
  catchError,
  decode,
  encode,
  adminValidator,
  generateToken,
  cookie,
  verifyToken,
  sendMail,
  otpGenerator,
  cache,
} from "../utils/index.js";

export class AdminController {
  async signUpSuperAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        return catchError(res, 400, `Error in signing up superadmin`);
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ role: "superadmin" });

      if (existing) {
        return catchError(res, 409, "Superadmin already exists");
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
      return catchError(res, 500, `Internal server error`);
    }
  }

  async signUpAdmin(req, res) {
    try {
      const { error, value } = adminValidator(req.body);
      if (error) {
        return catchError(res, 400, `Error in signing up admin`);
      }

      const { username, email, password } = value;
      const existing = await Admin.findOne({ username });

      if (existing) {
        return catchError(res, 409, "Admin already exists");
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
      return catchError(res, 500, `Internal server error`);
    }
  }

  async signInAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await Admin.findOne({ email });

      if (!existing) {
        return catchError(res, 404, `Admin not found`);
      }

      const encodedPassword = await encode(password, existing.decodedPassword);

      if (!encodedPassword) {
        return catchError(res, 400, `Error in encoding password`);
      }

      const otp = otpGenerator();
      sendMail(email, "Otp sent", otp);
      cache.setCache(existing.username, otp);

      return res.status(200).json({
        statusCode: 200,
        message: "OTP sent",
      });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async signinConfirmAdmin(req, res) {
    try {
      const { username, otp } = req.body;

      const otpCache = cache.getCache(username);

      if (!otpCache) {
        return catchError(res, 404, `Username not found`);
      }      

      if (!otp || otp !== otpCache) {
        return catchError(res, 400, `Otp expired or invalid otp`);
      }

      const existing = await Admin.findOne({ username });

      if (!existing) {
        return catchError(res, 404, `Admin not found`);
      }

      const payload = {
        sub: existing._id,
        role: existing.role,
      };

      const token = generateToken(payload);

      const { accessToken, refreshToken } = token;
      cookie(res, refreshToken);

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: accessToken });
    } catch (error) {
      return catchError(res, 500, error);
    }
  }

  async signOutAdmin(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return catchError(res, 401, "Refresh Token not found");
      }

      const { valid } = verifyToken(refreshToken);

      if (!valid) {
        return catchError(res, 401, "Refresh Token expired");
      }

      res.clearCookie("refreshToken");

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: {} });
    } catch (error) {
      return catchError(res, 500, error);
    }
  }

  async accessToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return catchError(res, 401, "Refresh Token not found");
      }

      const { valid, encoded } = verifyToken(refreshToken);

      if (!valid) {
        return catchError(res, 401, "Refresh Token expired");
      }

      const payload = {
        id: encoded.id,
        role: encoded.role,
      };

      const { accessToken } = generateToken(payload);

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: accessToken });
    } catch (error) {
      return catchError(res, 500, error);
    }
  }

  async getAllAdmins(__, res) {
    try {
      const admins = await Admin.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allAdmins: admins });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async getAllUsers(__, res) {
    try {
      const users = await User.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", allUsers: users });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async getAdminById(req, res) {
    try {
      const admin = await this.findAdminById(req.params.id);

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", admin: admin });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return catchError(res, 400, `ID not found`);
      }

      const existingUser = await User.findById(id);

      if (!existingUser) {
        return catchError(res, 404, `User not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "ok", user: existingUser });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async updateAdminById(req, res) {
    try {
      await this.findAdminById(req.params.id);

      const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });

      if (!admin) {
        return catchError(res, 404, `Admin not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully updated" });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async deleteAdminById(req, res) {
    try {
      const admin = await this.findAdminById(req.params.id);

      if (admin.role === "superadmin") {
        return catchError(res, 400, `Danggg Super admin cannot be deleted`);
      }
      await Admin.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ statusCode: 200, message: "Admin successfully deleted" });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async findAdminById(id) {
    try {
      if (!id) {
        return catchError(res, 400, `ID not found`);
      }
      const admin = await Admin.findById(id);

      if (!admin) {
        return catchError(res, 404, `Admin not found by ${id}`);
      }
      return admin;
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }
}
