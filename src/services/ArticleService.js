const articleRepository = require("../data/ArticleRepository");
const prisma = require("../prisma/client");

class ArticleService {
  async createArticle(standId, name, description, imageUrl) {
    const stand = await prisma.stand.findUnique({
      where: { id: standId },
      include: { articles: true },
    });

    if (!stand) {
      throw new Error("Stand introuvable");
    }

    if (stand.articles.length >= stand.maxArticles) {
      throw new Error(
        `Ce stand a déjà atteint sa limite de ${stand.maxArticles} article(s).`
      );
    }
    return await articleRepository.createArticle({
      name,
      description,
      imageUrl,
      standId,
    });
  }

  async getAllArticles() {
    return await articleRepository.findAll();
  }

  async getArticleById(id) {
    const article = await articleRepository.findById(id);
    if (!article) throw new Error("Article introuvable");
    return article;
  }

  async updateArticle(id, updates) {
    return await articleRepository.updateArticle(id, updates);
  }

  async deleteArticle(id) {
    return await articleRepository.deleteArticle(id);
  }
}

module.exports = new ArticleService();
