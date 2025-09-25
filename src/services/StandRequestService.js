const StandRequestRepository = require("../data/StandRequestRepository");
const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

class StandRequestService {
  async create(data) {
    // data = { structureName, email, requesterName, activitySector }
    return StandRequestRepository.create(data);
  }

  async getAll() {
    return StandRequestRepository.findAll();
  }

  async getById(id) {
    return StandRequestRepository.findById(id);
  }

  async validateRequest(id) {
    const request = await StandRequestRepository.findById(id);
    if (!request) throw new Error("Demande introuvable");
    if (request.validated) throw new Error("Demande déjà validée");

    // Création du stand
    const stand = await prisma.stand.create({
      data: {
        structureName: request.structureName,
        activitySector: request.activitySector,
      },
    });

    // Création du compte avec un password généré
    const rawPassword = nanoid(8);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const usernameBase = request.email.split("@")[0];
    const username = usernameBase + nanoid(3);

    const compte = await prisma.compte.create({
      data: {
        username,
        password: hashedPassword,
        email: request.email,
        name: request.requesterName,
        standId: stand.id,
      },
    });

    // Mise à jour de la demande
    await StandRequestRepository.update(id, {
      validated: true,
      standId: stand.id,
    });

    // On renvoie le compte + mot de passe en clair (à envoyer par mail)
    return {
      compte,
      stand,
      rawPassword,
    };
  }
}

module.exports = new StandRequestService();
