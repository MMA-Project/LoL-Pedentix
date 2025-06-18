# 🎮 Frontend – League of Legends Pédantix

Interface web du jeu **Pédantix version League of Legends**. Ce frontend permet aux joueurs de deviner le champion du jour à partir de sa page Wikipédia, avec un affichage interactif et progressif.

NAUD Mattis SIMON Melvin CLENET Alexandre
---

## Sommaire

- [🎮 Frontend – League of Legends Pédantix](#-frontend--league-of-legends-pédantix)
  - [NAUD Mattis SIMON Melvin CLENET Alexandre](#naud-mattis-simon-melvin-clenet-alexandre)
  - [Sommaire](#sommaire)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Lancement du projet](#lancement-du-projet)
  - [Scripts disponibles](#scripts-disponibles)
    - [Structure du projet](#structure-du-projet)
    - [Stack \& Technologies](#stack--technologies)
  - [Tests \& Qualité](#tests--qualité)
    - [Linting](#linting)

---

## Prérequis

- Node.js 18+
- `npm`
- (Optionnel) un IDE comme VSCode avec l’extension ESLint pour flag en temps réel

---

## Installation

```bash
git clone https://github.com/MMA-Project/LoL-Pedentix.git
cd frontend
npm install
```

## Lancement du projet

En mode développement

```bash
npm run dev
```

## Scripts disponibles

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Lance le serveur de dev Vite        |
| `npm run build`   | Build le projet pour la prod        |
| `npm run preview` | Lance un serveur local sur le build |
| `npm run lint`    | Exécute ESLint sur les fichiers     |

### Structure du projet

```txt
src/
├── api/                         # Appels API vers le backend
├── assets/                      # Images, icônes (logo, 404, boutons...)
├── components/                  # Composants visuels (UI)
├── context/                     # Contexte React pour le jeu quotidien
├── models/                      # Interfaces TypeScript
├── routes/                      # Pages principales (DailyPedantix, 404)
├── utils/                       # Fonctions utilitaires (ex: texte)
├── layout.tsx                   # Mise en page globale
├── main.tsx                     # Entrée de l’app
└── index.css                    # Styles globaux
```

### Stack & Technologies

- React 18

- Vite

- Context API (gestion de l’état global)

- Tailwind

- TypeScript



## Tests & Qualité

### Linting
```bash
npm run lint
```

Le projet utilise :

✅ Husky pour les hooks pre-commit

✅ ESLint (flat config, minimaliste)
