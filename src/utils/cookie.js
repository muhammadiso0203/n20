import { catchError } from "./index.js";

export const cookie = (res, refreshToken) => {
  try {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    catchError(res, 500, `Internal server error`);
  }
};
