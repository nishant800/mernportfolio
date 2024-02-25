const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "unauthorised HTTP, Token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("token from auth middleware", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY);
    // console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    next();
  } catch (error) {
    res.status(401).json({ msg: "unauthorised Invalid token" });
  }
};
module.exports = authMiddleware;