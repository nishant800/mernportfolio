const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized, Token not provided" });
    }

    const jwtToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ msg: "Unauthorized, Invalid token" });
    }

    const userData = await User.findById(decoded.userId);

    if (!userData) {
      return res.status(401).json({ msg: "Unauthorized, User not found" });
    }

    if (!userData.isAdmin) {
      return res.status(403).json({ msg: "Forbidden, User is not an admin" });
    }

    req.user = userData;
    req.token = jwtToken;
    req.isAdmin = userData.isAdmin;

    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = adminMiddleware;
