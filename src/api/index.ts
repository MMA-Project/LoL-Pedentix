const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchDailyGame() {
  const response = await fetch(`${API_BASE_URL}/api/game/start`);
  return await response.json();
}

export async function fetchGameById(gameId: string) {
  const response = await fetch(`${API_BASE_URL}/api/game/${gameId}`);
  return await response.json();
}

export async function submitGuess(gameId: string, word: string) {
  const response = await fetch(`${API_BASE_URL}/api/game/guess/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });
  return await response.json();
}
