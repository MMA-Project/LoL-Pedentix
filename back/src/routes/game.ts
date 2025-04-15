import express from "express";
import { v4 as uuidv4 } from "uuid";
import { exampleLeaguePedantix } from "../models/LeaguePedantix";
import Game from "../models/Game";
import { getMaskedText } from "../utils/words";

const router = express.Router();

const games: Record<string, Game> = {};

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

    games[gameId] = game;

    res.json({
        gameId,
        seed,
        maskedText: getMaskedText(game.rawText, game.foundWords),
    });
});

router.post("/guess/:id", (req, res) => {
    const { id } = req.params;
    const { word } = req.body;

    const game = games[id];
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
