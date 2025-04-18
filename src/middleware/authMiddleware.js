import { verifyToken } from "../library/index.js";
import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const [type, token] = (req.headers.authorization || "").split(" ") || "";

    if (type !== "Bearer") {
      return res.status(403).json({ message: "Authentication required" });
    }

    const { decoded } = verifyToken(token);

    const user = await User.findById(decoded.sub);

    if (!user)
      return res.status(401).json({ message: "Authentication failed" });

    req.user = user;
    next();
    return;
  } catch (error) {
    next(error);
  }
};
