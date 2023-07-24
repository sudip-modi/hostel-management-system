const jwt = require("jsonwebtoken");

//token verification middleware
const verifyToken = (req, res, next) => {
  // search for bearer token from req
  let bearerToken = req.headers.authorization;
  //extract token from bearer token
  let token = bearerToken.split(" ")[1]; //["Bearer", "xydggefrg4yughtru"]
  //if token is not existed , send "res" as unauthorised access
  if (token == undefined) {
    res.send({ message: "Unauthorized Access" });
  }
  //if token is there but expired, send res as login
  try {
    let decodedToken = jwt.verify(token, "abcdef");
    console.log(decodedToken);
    //call next middleware
    next();
  } catch (err) {
    res.send({ message: "Token expired ..pls relogoin" });
  }
  //if token is there and valid then forward to next middleware
};

module.exports = verifyToken;
