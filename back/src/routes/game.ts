import express from "express";
import { v4 as uuidv4 } from "uuid";
import Game from "../models/Game";
import { getMaskedText } from "../utils/words";
import path from "path";
import fs from "fs";
import { getDailySeed } from "../utils/seed";
import { getLeaguePedantixfromSeed } from "../models/LeaguePedantix";
import cron from "node-cron";

const router = express.Router();

const GAMES_DIR = path.join(__dirname, "..", "data", "games");

if (!fs.existsSync(GAMES_DIR)) {
  fs.mkdirSync(GAMES_DIR, { recursive: true });
}

const getGameFilePath = (id: string) => path.join(GAMES_DIR, `${id}.json`);

const saveGameToFile = (game: Game) => {
  fs.writeFileSync(
    getGameFilePath(game.id),
    JSON.stringify(game, null, 2),
    "utf-8"
  );
};

const loadGameFromFile = (id: string): Game | null => {
  const filePath = getGameFilePath(id);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
};

router.get("/start", async (req, res) => {
  const seed = getDailySeed();

  const chosen = await getLeaguePedantixfromSeed(seed);

  const gameId = uuidv4();
  const game: Game = {
    id: gameId,
    seed: seed.toString(),
    name: chosen.name,
    guessed: false,
    image: chosen.image,
    mode: "daily",
    rawText: chosen.text,
    foundWords: [],
  };

  saveGameToFile(game);

  res.json({
    gameId,
    seed,
    guessed: game.guessed,
    text: getMaskedText(game.rawText, game.foundWords),
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const game = loadGameFromFile(id);
  if (!game) {
    res.status(404).send("Game not found");
    return;
  }

  res.json({
    gameId: game.id,
    seed: game.seed,
    guessed: game.guessed,
    text: getMaskedText(game.rawText, game.foundWords),
    foundWords: game.foundWords,
  });
});

router.post("/guess/:id", (req, res) => {
  const { id } = req.params;
  const { word } = req.body;

  const game = loadGameFromFile(id);
  if (!game) {
    res.status(404).send("Game not found");
    return;
  }
  if (game.guessed) {
    res.status(400).send("Game already finished.");
    return;
  }

  const wordLower = word.toLowerCase();

  if (game.foundWords.includes(wordLower)) {
    res.status(400).send("Word already found.");
    return;
  }

  if (game.name.toLowerCase() === wordLower) {
    game.guessed = true;
    saveGameToFile(game);
    res.json({
      gameId: game.id,
      seed: game.seed,
      guessed: game.guessed,
      text: game.rawText,
      title: game.name,
      image: game.image,
      foundWords: game.foundWords,
    });
    return;
  }

  let correct = false;
  if (game.rawText.toLowerCase().includes(wordLower)) {
    game.foundWords.push(wordLower);
    saveGameToFile(game);
    correct = true;
  }

  res.json({
    correct,
    id: game.id,
    seed: game.seed,
    guessed: game.guessed,
    text: getMaskedText(game.rawText, game.foundWords),
    foundWords: game.foundWords,
  });
});

export default router;

const clearOldGames = () => {
  const files = fs.readdirSync(GAMES_DIR);
  const todaySeed = getDailySeed().toString();

  files.forEach((file) => {
    const filePath = path.join(GAMES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const game: Game = JSON.parse(content);

    if (game.seed !== todaySeed) {
      fs.unlinkSync(filePath);
    }
  });
};

cron.schedule("0 0 * * *", () => {
  clearOldGames();
  console.log("Old games cleared at midnight.");
});
clearOldGames();
