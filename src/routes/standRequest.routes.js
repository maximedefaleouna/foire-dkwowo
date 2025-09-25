const express = require("express");
const router = express.Router();
const controller = require("../controllers/StandRequestController");

/**
 * @swagger
 * tags:
 *   name: StandRequests
 *   description: Gestion des demandes de stands
 *
 * components:
 *   schemas:
 *     StandRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "req_123abc"
 *         structureName:
 *           type: string
 *           example: "La Boîte"
 *         email:
 *           type: string
 *           example: "contact@laboite.fr"
 *         requesterName:
 *           type: string
 *           example: "Jean Dupont"
 *         activitySector:
 *           type: string
 *           example: "Technologie"
 *         validated:
 *           type: boolean
 *           example: false
 *         standId:
 *           type: string
 *           nullable: true
 *           example: null
 *
 *     Stand:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "stand_456def"
 *         structureName:
 *           type: string
 *           example: "La Boîte"
 *         activitySector:
 *           type: string
 *           example: "Technologie"
 *
 *     Compte:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "compte_789ghi"
 *         username:
 *           type: string
 *           example: "contact123"
 *         email:
 *           type: string
 *           example: "contact@laboite.fr"
 *         name:
 *           type: string
 *           example: "Jean Dupont"
 *         standId:
 *           type: string
 *           example: "stand_456def"
 *
 *     ValidationResponse:
 *       type: object
 *       properties:
 *         compte:
 *           $ref: '#/components/schemas/Compte'
 *         stand:
 *           $ref: '#/components/schemas/Stand'
 *         rawPassword:
 *           type: string
 *           description: Mot de passe en clair généré pour le compte
 *           example: "a1b2c3d4"
 */

/**
 * @swagger
 * /stand-requests:
 *   post:
 *     summary: Créer une nouvelle demande de stand
 *     tags: [StandRequests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - structureName
 *               - email
 *               - requesterName
 *               - activitySector
 *             properties:
 *               structureName:
 *                 type: string
 *                 example: "La Boîte"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "contact@laboite.fr"
 *               requesterName:
 *                 type: string
 *                 example: "Jean Dupont"
 *               activitySector:
 *                 type: string
 *                 example: "Technologie"
 *     responses:
 *       201:
 *         description: Demande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandRequest'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Champs manquants ou invalides"
 */

/**
 * @swagger
 * /stand-requests:
 *   get:
 *     summary: Récupérer toutes les demandes de stands
 *     tags: [StandRequests]
 *     responses:
 *       200:
 *         description: Liste des demandes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StandRequest'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur interne"
 */

/**
 * @swagger
 * /stand-requests/{id}:
 *   get:
 *     summary: Récupérer une demande de stand spécifique par ID
 *     tags: [StandRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la demande
 *     responses:
 *       200:
 *         description: Demande trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StandRequest'
 *       404:
 *         description: Demande introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Stand introuvable"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur interne"
 */

/**
 * @swagger
 * /stand-requests/{id}/validate:
 *   post:
 *     summary: Valider une demande de stand
 *     tags: [StandRequests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la demande à valider
 *     responses:
 *       200:
 *         description: Demande validée et compte créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationResponse'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Demande introuvable ou déjà validée"
 */

router.post("/", (req, res) => controller.create(req, res));
router.get("/", (req, res) => controller.list(req, res));
router.get("/:id", (req, res) => controller.getStand(req, res));
router.post("/:id/validate", (req, res) => controller.validate(req, res));

module.exports = router;
