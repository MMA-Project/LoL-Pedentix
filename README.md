# 🎮 Frontend – League of Legends Pédantix

Interface web du jeu **Pédantix version League of Legends**. Ce frontend permet aux joueurs de deviner le champion du jour à partir de sa page [Universe](https://universe.leagueoflegends.com/fr_FR/), avec un affichage interactif et progressif.

NAUD Mattis  
SIMON Melvin  
CLENET Alexandre  
[Git Tasks](https://github.com/orgs/MMA-Project/projects/1/views/1)

---

## Sommaire

- [🎮 Frontend – League of Legends Pédantix](#-frontend--league-of-legends-pédantix)
  - [Sommaire](#sommaire)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Lancement du projet](#lancement-du-projet)
    - [Structure du projet](#structure-du-projet)
    - [Stack \& Technologies](#stack--technologies)
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

- Tailwind (Insparation Graphique : [loldle](https://loldle.net/))

- TypeScript
  

### Linting
```bash
npm run lint
```

Le projet utilise :

✅ Husky pour les hooks pre-commit

✅ ESLint (flat config, minimaliste)
