const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Create middleware to check if user is already signedIn to the application
module.exports.isSignedIn = async (req, res, next) => {
  try {
    // Verify the jwt token
    const decoded = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send([
      {
        error: "Please authenticate",
      },
    ]);
  }
};
