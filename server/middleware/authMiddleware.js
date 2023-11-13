const admin = require("../firebase/index.js");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).json({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.status(401).json({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      // You can access user information in decodedToken
      request.user = decodedToken;
      console.log(token);
      next();
    })
    .catch((error) => {
      return response.status(403).json({ message: "Could not authorize" });
    });
}
module.exports = authMiddleware;
