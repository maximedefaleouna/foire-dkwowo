/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Gestion des articles de stands
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "art_123abc"
 *         name:
 *           type: string
 *           example: "Carte SIM Togocom"
 *         description:
 *           type: string
 *           example: "Carte SIM avec bonus internet"
 *         imageUrl:
 *           type: string
 *           example: "/uploads/image-uuid.jpg"
 *         standId:
 *           type: string
 *           example: "stand_456def"
 */

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const articleController = require("../controllers/ArticleController");
const upload = require("../config/multer");

/**
 * @swagger
 * /api/article:
 *   post:
 *     summary: Ajouter un article pour un stand
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Erreur lors de la création
 */

router.post(
  "/",
  authMiddleware.verifyToken,
  upload.single("image"),
  (req, res) => articleController.create(req, res)
);

/**
 * @swagger
 * /api/article:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */

router.get("/", (req, res) => articleController.getAll(req, res));

/**
 * @swagger
 * /api/article/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 */

router.get("/:id", (req, res) => articleController.getOne(req, res));

/**
 * @swagger
 * /api/article/{id}:
 *   put:
 *     summary: Modifier un article existant
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Erreur de validation
 */

router.put("/:id", authMiddleware.verifyToken, (req, res) =>
  articleController.update(req, res)
);
/**
 * @swagger
 * /api/article/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       400:
 *         description: Erreur lors de la suppression
 */

router.delete("/:id", authMiddleware.verifyToken, (req, res) =>
  articleController.delete(req, res)
);

module.exports = router;
