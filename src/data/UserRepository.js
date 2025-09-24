const prisma = require("../prisma/client");

class UserRepository {
  async findByUsername(username) {
    console.log(username);
    return prisma.Compte.findUnique({
      where: { username },
      include: { stand: true },
    });
  }
}

module.exports = new UserRepository();
