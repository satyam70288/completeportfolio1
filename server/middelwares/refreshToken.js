const jwt = require("jsonwebtoken");

exports.refreshToken = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie;
    const prevToken = cookies ? cookies.split("=")[1] : null;

    if (!prevToken) {
      return res.status(401).json({
        success: false,
        message: "Please log in first",
      });
    }

    jwt.verify(prevToken, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          // Handle token expiration separately
          return res.status(401).json({
            success: false,
            message: "Token has expired. Please log in again.",
          });
        }

        // Handle other token verification errors
        return res.status(403).json({
          success: false,
          message: "Invalid token",
        });
      }

      // Clear the previous token cookie
      res.clearCookie("token");

      // Generate a new token with a short expiration time (30 seconds in this case)
      const newToken = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30s",
        }
      );

      // Set the new token as a cookie
      res.cookie("token", newToken, {
        path: "/",
        httpOnly: true,
        expiresIn: new Date(new Date() + 1000 * 30),
      });

      // Attach user id to the request object for further use in the route handlers
      req.id = user.id;

      // Continue to the next middleware or route handler
      next();
    });
  } catch (err) {
    // Handle other errors if needed
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
