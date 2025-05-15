export const errorRes = (res, statusCode, message, type) => {
  return res.status(statusCode).json({
    statusCode,
    success: false,
    error: {
      message: message || "Internal server error",
      type: type || "UnkownErrorType",
    },
  });
};
