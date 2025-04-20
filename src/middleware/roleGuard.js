export const roleGuard = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: `Access denied for role: ${req.user.role}` });
      }

      next();
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
        name: error.name,
      });
    }
  };
};
