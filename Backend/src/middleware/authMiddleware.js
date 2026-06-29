const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    const authHeader = req.header("Authorization");
    //checking header
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }
    // console.log(authHeader);

    //token extraction from header
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    //verification of token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //attaching the user with the token
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError" ? "Token expired" : "Invalid token";
    res.status(401).json({
      success: false,
      message: message,
    });
  }
}

module.exports = { auth };
