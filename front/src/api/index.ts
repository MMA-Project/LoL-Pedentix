const API_BASE_URL = "http://localhost:3001/api/game";

export async function fetchDailyGame() {
  const response = await fetch(`${API_BASE_URL}/start`);
  return await response.json();
}

export async function fetchGameById(gameId: string) {
  const response = await fetch(`${API_BASE_URL}/${gameId}`);
  return await response.json();
}

export async function submitGuess(gameId: string, word: string) {
  const response = await fetch(`${API_BASE_URL}/guess/${gameId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });
  return await response.json();
}
