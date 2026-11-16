# Plateforme Backend de Gestion d'Evenements et Foires Commerciales au Togo

API REST robuste, securisee et modulaire concue pour digitaliser et automatiser la gestion complete des foires commerciales, salons d'exposition et evenements economiques au Togo.

Ce backend permet de moderniser l'ensemble du cycle de vie d'une foire : de la soumission en ligne des demandes de stands par les structures et entrepreneurs togolais, a leur validation administrative avec provisionnement automatique d'espaces exposants, jusqu'a l'exposition et la mise en valeur des produits locaux via des catalogues d'articles numeriques.

---

## Vision et Impact pour les Foires au Togo

Les grands rassemblements commerciaux et foires du Togo (telles que la Foire Internationale de Lome, les foires artisanales et foires regionales) necessitent une transition vers des solutions numeriques performantes afin d'optimiser l'organisation logistique et commerciale :

- **Elimination des demarches manuelles** : Remplacement des formulaires physiques par un systeme numerique instantane d'enregistrement des demandes de stands.
- **Automatisation du provisionnement** : Creation instantanee du stand officiel, generation securisee des identifiants d'acces exposant et attribution des quotas lors de la validation administrative.
- **Visibilite numerique de l'artisanat et de l'economie togolaise** : Chaque exposant dispose d'un espace dedie pour televerser et promouvoir ses articles et productions locales.
- **Transparence et scalabilite** : Suivi en temps reel de l'etat des demandes et gestion centralisee du parc de stands.

---

## Excellence Architecturale du Backend

Le backend est developpe selon les principes d'une architecture en couches stricte (Layered Architecture / N-Tiers) garantissant une separabilite nette des responsabilites, une forte testabilite et une maintenance simplifiee :

### 1. Couche Controleurs (Controllers)
Point d'entree des requetes HTTP. Les controleurs isolent la couche de transport web (Express 5), extraient les parametres, gerent les codes de statut HTTP standardises (200, 201, 400, 401, 403, 404, 500) et deleguent immediatement le traitement a la couche metier.

### 2. Couche Services Metier (Business Logic Layer)
Coeur applicatif du systeme contenant l'ensemble des regles fonctionnelles :
- Verification de l'unicite et de la non-validation prealable d'une demande.
- Generation automatique de mots de passe cryptographiquement surs via `nanoid` lors de l'approbation d'un stand.
- Generation d'identifiants uniques pour chaque exposant.
- Controle strict et respect des quotas d'exposition (limite maximale d'articles par stand configuree dynamiquement).
- Orchestration de la creation conjointe du stand et du compte utilisateur associe.

### 3. Couche d'Acces aux Donnees (Repository Pattern & Prisma ORM)
Toutes les interactions avec la base de donnees relationnelle PostgreSQL sont encapsulees derriere des classes de depot (Repositories). Ce decouplage total permet d'abstraire la logique SQL sous-jacente tout en tirant parti du typage strict, des relations relationnelles complexes et des requetes optimisees offertes par Prisma Client.

### 4. Couche Securite et Authentification
- Chiffrement unidirectionnel des mots de passe utilisant l'algorithme BCRYPT avec un cout de salage de 10 passes.
- Authentification sans etat (Stateless) basee sur des jetons d'acces JSON Web Tokens (JWT) signes avec expiration temporelle de 2 heures.
- Middleware d'autorisation charge de verifier la validite cryptographique du jeton avant toute action privee sur le stand ou les articles.

### 5. Documentation Interactive des Endpoints (Swagger OpenAPI 3.0)
L'ensemble de l'API est integralement annote et documente via Swagger JSDoc. Une interface interactive Swagger UI est directement accessible a l'adresse `/api-docs` pour inspecter, tester et integrer les routes avec leurs modeles de requetes et de reponses.

---

## Modeles et Relations de Donnees

La persistance des donnees est assuree par PostgreSQL avec les schemas relationnels suivants :

- **StandRequest** : Stocke les candidatures initiales (nom de la structure, email, nom du demandeur, secteur d'activite, statut de validation).
- **Stand** : Represente l'emplacement physique et numerique attribue a l'exposant, relie de facon unique a sa demande initiale.
- **Compte** : Identifiants de connexion et profil du representant officiel du stand, associe en relation 1 a 1 avec le stand.
- **Article** : Produits et marchandises exposes, relies en relation N a 1 avec le stand proprietaire, comprenant nom, description et visuel telecharge.

---

## Endpoints Principaux de l'API

### Gestion des Demandes de Stands
- `POST /api/stand-requests` : Soumission d'une nouvelle demande de reservation de stand par un exposant.
- `GET /api/stand-requests` : Consultation de l'ensemble des demandes pour le comite d'organisation.
- `GET /api/stand-requests/:id` : Consultation detaillee d'une demande specifique.
- `POST /api/stand-requests/:id/validate` : Validation administrative d'une demande avec creation automatique du stand et generation des identifiants de l'exposant.

### Authentification des Exposants
- `POST /api/auth/login` : Connexion avec identifiant et mot de passe, delivrance du jeton d'acces JWT contenant l'identifiant du stand associe.

### Gestion des Articles du Catalogue
- `POST /api/article` : Ajout d'un nouvel article avec televersement d'image via Multer (verifie automatiquement le quota maximal autorise par stand).
- `GET /api/article` : Consultation de l'ensemble des articles exposes sur la foire.
- `GET /api/article/:id` : Consultation de la fiche complete d'un article.
- `PUT /api/article/:id` : Mise a jour des informations d'un article.
- `DELETE /api/article/:id` : Retrait d'un article du stand.

---

## Technologies et Outils Backend

| Domaine | Technologie |
| :--- | :--- |
| **Environnement d'execution** | Node.js (CommonJS) |
| **Framework HTTP** | Express 5 |
| **Base de donnees & ORM** | PostgreSQL, Prisma ORM 6 |
| **Securite & Hachage** | JSON Web Tokens (JWT), Bcrypt |
| **Gestion des fichiers** | Multer (stockage multipart des images) |
| **Validation & Identifiants** | Zod, NanoID, UUID |
| **Documentation API** | Swagger UI Express, Swagger JSDoc |
| **Environnement de developpement** | Nodemon, Dotenv |

---

## Installation et Lancement

### 1. Prerequis
- Node.js (version 18 ou superieure)
- Une instance PostgreSQL en cours d'execution
- npm ou yarn

### 2. Cloner le depot
```bash
git clone https://github.com/maximedefaleouna/foire-dkwowo.git
cd foire-dkwowo
```

### 3. Installer les dependances
```bash
npm install
```

### 4. Configuration de l'environnement
Creez un fichier `.env` a la racine du projet avec les variables suivantes :
```env
PORT=3000
DATABASE_URL="postgresql://utilisateur:motdepasse@localhost:5432/nom_base_de_donnees?schema=public"
JWT_SECRET="votre_cle_secrete_jwt_robuste"
```

### 5. Migration de la base de donnees
Appliquez les schemas Prisma a votre base PostgreSQL :
```bash
npx prisma migrate dev
```

### 6. Demarrage du serveur
Pour lancer en mode developpement avec rechargement automatique :
```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:3000`.
La documentation interactive de l'API est consultable sur : `http://localhost:3000/api-docs`.

---

## Auteur

**Maxime DEFALEOUNA**
- Profil GitHub : [@maximedefaleouna](https://github.com/maximedefaleouna)
