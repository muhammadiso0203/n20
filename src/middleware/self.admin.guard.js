import { catchError } from "../utils/index.js";

export const selfGuard = (req, res, next) => {
  try {
    const user = req?.user;

    if (user && (user.role === "admin" || user.role === "superadmin")) {
      return next();
    }

    return res.status(403).json({ statusCode: 403, message: "Forbidden user" });
  } catch (error) {
    catchError(error, res);
  }
};
