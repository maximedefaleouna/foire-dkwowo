const AuthService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const result = await AuthService.login(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AuthController();
