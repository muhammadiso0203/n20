import { catchError, verifyToken } from "../utils/index.js";

export const jwtAuthGuard = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Authorization header missing" });
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer") {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Invalid token type" });
    }

    if (!token) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Token not found" });
    }

    const { valid, expire, encoded } = verifyToken(token);

    if (!valid) {
      return res.status(400).json({
        statusCode: 400,
        message: expire ? "Token expired" : "Invalid token",
      });
    }

    req.user = encoded;
    req.params.id = encoded.sub
    next();
  } catch (error) {
    catchError(error, res);
  }
};
