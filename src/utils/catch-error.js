export const catchError = (res, code, error) => {
  return res.status(code || 500).json({
    statusCode: code,
    message: error || "Internal server error",
  });
};
