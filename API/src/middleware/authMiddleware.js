const jwt = require("jsonwebtoken");
require("dotenv").config();

function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }
    next();
  };
}

function isGuest(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return next(); // No token -> Can access

  const token = authHeader.split("")[1];
  if (!token) return next();

  // Verify token
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(403).json({ message: "Already logged in" });
  } catch (err) {
    return next();
  }
}

module.exports = { authorizeRole, isGuest };
