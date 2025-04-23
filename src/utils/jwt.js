import j from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const accessTokenTime = process.env.ACCESS_TOKEN_TIME;
const refreshTokenTime = process.env.REFRESH_TOKEN_TIME;

export const generateToken = (payload) => {
  const accessToken = j.sign(payload, secret, { expiresIn: accessTokenTime });
  const refreshToken = j.sign(payload, secret, { expiresIn: refreshTokenTime });
  return { accessToken, refreshToken };
};

export const verifyToken = (token) => {
  try {
    const encoded = j.verify(token, secret);
    return {
      valid: true,
      expire: false,
      encoded,
    };
  } catch (error) {
    return {
      valid: false,
      expire: error.name === "TokenExpiredError",
      encoded: null,
    };
  }
};
