export const errorRes = (res, statusCode, message, errorType = {}) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    error: {
      message: message || "Something went wrong",
      type: errorType || "ServerError",
    },
  });
};
