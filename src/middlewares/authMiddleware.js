const jwt = require("jsonwebtoken");

class AuthMiddleware {
  verifyToken(req, res, next) {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ message: "Token manquant" });

    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { userId, username, standId }
      console.log(req.user);
      next();
    } catch (err) {
      return res.status(403).json({ message: "Token invalide" });
    }
  }
}

module.exports = new AuthMiddleware();
