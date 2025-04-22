export const catchError = (err, res) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
    name: err.name,
  });
};
