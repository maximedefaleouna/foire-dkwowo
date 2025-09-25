const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Foire Ndokowo",
      version: "1.0.0",
      description: `
##  À propos du projet

Cette API permet de gérer les inscriptions, stands et articles pour la **foire Ndokowo**.

Fonctionnalités principales :
- 📌 Création de demandes de stands
- ✅ Validation des demandes (création automatique de compte + stand)
- 🔐 Authentification via JWT
- 📰 Gestion des articles avec upload d’image

---

## Démarrage

3. **Configurer l’environnement :**

- Modifier les variables \`.env\`:
  - \`DATABASE_URL\` (connexion à PostgreSQL)
  - \`JWT_SECRET\`

4. **Créer la base de données PostgreSQL**

5. **Appliquer les migrations Prisma :**
\`\`\`bash
cd src
npx prisma migrate dev --name init
\`\`\`

6. **Lancer le serveur :**
\`\`\`bash
npm run dev
\`\`\`

---

## 📂 Accès aux fichiers uploadés

Les images sont disponibles via :

\`\`\`
http://localhost:8000/uploads/<nom-du-fichier>
\`\`\`

---

## 🔐 Authentification

Certaines routes nécessitent un token JWT :

1. Authentification via : \`POST /api/auth/login\`
2. Ajouter dans les headers :
\`\`\`
Authorization: Bearer <token>
\`\`\`

---

## 👨‍💻 Équipe de développement

- **Maxime DEFALEOUNA** — Backend Developer — maximedefa@gmail.com  
- **Maxime ATHON** — Frontend Developer 

---

## 📘 Documentation des routes

Toutes les routes sont documentées ci-dessous.
      `,
      contact: {
        name: "Équipe Ndokowo",
        email: "maximedefa@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000/api",
        description: "Serveur local",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/**/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
