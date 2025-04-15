import express from "express";
import { v4 as uuidv4 } from "uuid";
import { exampleLeaguePedantix } from "../models/LeaguePedantix";
import Game from "../models/Game";
import { getMaskedText } from "../utils/words";
import path from "path";
import fs from "fs";

const router = express.Router();

const GAMES_DIR = path.join(__dirname, "..", "data", "games");

if (!fs.existsSync(GAMES_DIR)) {
    fs.mkdirSync(GAMES_DIR, { recursive: true });
}

const getGameFilePath = (id: string) => path.join(GAMES_DIR, `${id}.json`);

const saveGameToFile = (game: Game) => {
    fs.writeFileSync(getGameFilePath(game.id), JSON.stringify(game, null, 2), "utf-8");
};

const loadGameFromFile = (id: string): Game | null => {
    const filePath = getGameFilePath(id);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content);
};

router.get("/start", (req, res) => {
    const seed = new Date().toISOString().slice(0, 10);
    const chosen = exampleLeaguePedantix;

    const gameId = uuidv4();
    const game: Game = {
        id: gameId,
        seed,
        name: chosen.name,
        rawText: chosen.text,
        foundWords: [],
    };

    saveGameToFile(game);

    res.json({
        gameId,
        seed,
        maskedText: getMaskedText(game.rawText, game.foundWords),
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

    const wordLower = word.toLowerCase();

    if (game.foundWords.includes(wordLower)) {
        res.status(400).send("Word already found.");
        return;
    }

    if (game.rawText.toLowerCase().includes(wordLower)) {
        game.foundWords.push(wordLower);
        saveGameToFile(game);

        res.json({
            correct: true,
            maskedText: getMaskedText(game.rawText, game.foundWords),
            foundWords: game.foundWords,
        });
        return;
    }

    res.json({
        correct: false,
        maskedText: getMaskedText(game.rawText, game.foundWords),
    });
});


export default router;
