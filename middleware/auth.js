const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(401).json({
      status: "failed",
      message: "authorization failed you must logged in",
    });
    return;
  }
  //   check for right authorization
  const Token = authorizationHeader.split("Bearer ")[1];
  try {
    const checkToken = jwt.verify(Token, process.env.jwt_salt);
    req.user = checkToken;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "authorization failed check for right authorization",
    });
    return;
  }
  next();
};
module.exports = auth;
