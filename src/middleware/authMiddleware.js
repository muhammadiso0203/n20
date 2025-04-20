import { verifyToken } from "../library/index.js";
import { Admin, User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const [type, token] = (req.headers.authorization || "").split(" ") || "";

    if (type !== "Bearer") {
      return res.status(400).json({ message: "Authentication required" });
    }

    const { valid, expired, decoded } = verifyToken(token);

    if (!valid) {
      return res
        .status(401)
        .json({ message: expired ? "Token expired" : "Invalid token" });
    }
    const { sub, role } = decoded;

    let user;

    if (role === "admin" || role === "superadmin") {
      user = await Admin.findById(sub);
    } else if (role === "user") {
      user = await User.findById(sub);
    } else {
      return res.status(400).json({ message: "Unknown role" });
    }

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: role,
    };

    next();
  } catch (error) {
    next(error);
  }
};
