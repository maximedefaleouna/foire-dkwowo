const prisma = require("../prisma/client");

class ArticleRepository {
  async createArticle(data) {
    return await prisma.article.create({ data });
  }

  async findAll() {
    return await prisma.article.findMany({
      include: { stand: true },
    });
  }

  async findById(id) {
    return await prisma.article.findUnique({
      where: { id },
      include: { stand: true },
    });
  }

  async updateArticle(id, data) {
    return await prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(id) {
    return await prisma.article.delete({
      where: { id },
    });
  }
}

module.exports = new ArticleRepository();
