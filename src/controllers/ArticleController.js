const articleService = require("../services/ArticleService");

class ArticleController {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const standId = req.user.standId; // récupéré depuis JWT

      if (!standId) {
        return res.status(403).json({ error: "Aucun stand associé" });
      }

      let imageUrl = null;
      if (req.file) {
        // Construis ici l’URL publique pour accéder à l’image uploadée
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const article = await articleService.createArticle(
        standId,
        name,
        description,
        imageUrl
      );

      res.status(201).json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const articles = await articleService.getAllArticles();
      res.json(articles);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getOne(req, res) {
    try {
      const article = await articleService.getArticleById(req.params.id);
      res.json(article);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const article = await articleService.updateArticle(
        req.params.id,
        req.body
      );
      res.json(article);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      await articleService.deleteArticle(req.params.id);
      res.json({ message: "Article supprimé avec succès" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ArticleController();
