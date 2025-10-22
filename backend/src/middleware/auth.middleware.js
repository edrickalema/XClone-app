export const protectRoute = async (req, res, next) => {
  try {
    const auth = req.auth();
    if (!auth || !auth.isAuthenticated) {
      return res.status(401).json({
        message: "Unauthorized: you must be authenticated",
      });
    }

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({
      message: "Internal server error during authentication",
    });
  }
};
