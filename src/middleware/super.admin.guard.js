import { catchError } from "../utils/index.js";

export const superAdminGuard = (req, res, next) => {
  try {
    const user = req?.user;

    if (user.role !== "superadmin") {
      return res
        .status(403)
        .json({
          statusCode: 403,
          message: `Access denied for role ${user.role}`,
        });
    }

    next();
  } catch (error) {
    catchError(error, res);
  }
};
