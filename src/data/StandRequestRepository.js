const prisma = require("../prisma/client");

class StandRequestRepository {
  async create(data) {
    return prisma.standRequest.create({ data });
  }

  async findAll() {
    return prisma.standRequest.findMany();
  }

  async findById(id) {
    return prisma.standRequest.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.standRequest.update({
      where: { id },
      data,
    });
  }

  async findById(id) {
    return prisma.standRequest.findUnique({ where: { id } });
  }

  async update(id, data) {
    return prisma.standRequest.update({
      where: { id },
      data,
    });
  }
}

module.exports = new StandRequestRepository();
