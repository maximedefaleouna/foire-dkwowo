const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../data/UserRepository.js");

class AuthService {
  async login(username, password) {
    console.log(username, password);
    const user = await userRepository.findByUsername(username);
    if (!user) throw new Error("Utilisateur introuvable");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Mot de passe incorrect");

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        standId: user.stand ? user.stand.id : null,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return {
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        username: user.username,
        standId: user.stand ? user.stand.id : null,
      },
    };
  }
}

module.exports = new AuthService();
