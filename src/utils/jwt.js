import j from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const accessTokenExpire = process.env.ACCESS_TOKEN;
const refreshTokenExpire = process.env.REFRESH_TOKEN;

export const generateToken = (payload) => {
  try {
    const accessToken = j.sign(payload, secret, {
      expiresIn: accessTokenExpire,
    });

    const refreshToken = j.sign(payload, secret, {
      expiresIn: refreshTokenExpire,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(`Error in generating token:`, error.message);
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = j.verify(token, secret);

    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt expired",
      decoded: null,
    };
  }
};
