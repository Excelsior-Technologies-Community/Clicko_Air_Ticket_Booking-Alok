const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access Denied: No Token Provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret");

    req.user = decoded;

    if (decoded.role && decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: Admin Privileges Required",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
      error: error.message,
    });
  }
};

module.exports = { verifyAdmin };
