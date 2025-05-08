import { PedantixData } from "../models/PedantixData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchDailyGame(): Promise<PedantixData> {
  const response = await fetch(`${API_BASE_URL}/api/game/start`);
  return await response.json();
}

export async function fetchGameById(gameId: string): Promise<PedantixData> {
  const response = await fetch(`${API_BASE_URL}/api/game/${gameId}`);
  return await response.json();
}

export async function submitGuess(
  gameId: string,
  word: string
): Promise<PedantixData> {
  const response = await fetch(`${API_BASE_URL}/api/game/guess/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });
  return await response.json();
}
