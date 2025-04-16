import { User } from "../models/index.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const str = (req.headers.authorization || "").split(" ")[1] || "";

    const [userEmail, userPassword] = Buffer.from(str, "base64")
      .toString()
      .split(":");

    const user = await User.findOne({ email: userEmail }).exec();

    if (!user)
      return res.status(401).json({ message: "Authentication failed" });

    const isValidPassword = await user.isValidPassword(userPassword);

    if (
      userEmail &&
      userPassword &&
      userEmail === user.email &&
      isValidPassword
    ) {
      req.user = user;
      next();
      return;
    }

    res.status(401).send("Authentication failed");
  } catch (error) {
    next(error);
  }
};
