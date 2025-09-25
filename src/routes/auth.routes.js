const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       description: Informations d'authentification de l'utilisateur
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: alice
 *               password:
 *                 type: string
 *                 example: supersecret
 *     responses:
 *       200:
 *         description: Connexion réussie, token JWT et informations utilisateur retournés
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Connexion réussie
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: usr_123abc
 *                     username:
 *                       type: string
 *                       example: alice
 *                     standId:
 *                       type: string
 *                       nullable: true
 *                       example: stand_456def
 *       400:
 *         description: Utilisateur introuvable ou mot de passe incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Utilisateur introuvable
 */

router.post("/login", (req, res) => authController.login(req, res));

module.exports = router;
