# API Foire Ndokowo

## À propos du projet

Cette API permet de gérer les inscriptions, les stands et les articles pour la foire Ndokowo.

Fonctionnalités principales :
- Création de demandes de stands
- Validation des demandes avec création automatique de compte et stand
- Authentification via JWT
- Gestion des articles avec upload d’images

---

## Prérequis

- Node.js (version 16 ou plus recommandée)
- PostgreSQL (base de données relationnelle)

---

## Installation et démarrage

1. Cloner le projet :

```bash
git clone https://github.com/maximedefaleouna/foire-dkwowo.git
cd foire-dkwowo

npm install
cd src

npx prisma migrate dev --name init

on retourne a la racine

npm run dev

Le serveur écoute généralement sur http://localhost:8000

documentation de l'api http://localhost:8000/api-docs

