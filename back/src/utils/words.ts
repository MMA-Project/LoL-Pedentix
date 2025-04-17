export function getMaskedText(text: string, foundWords: string[]): string {
  const foundSet = new Set(foundWords.map((w) => w.toLowerCase()));

  return text.replace(/\b[\p{L}]+(?:'[\p{L}]+)*\b/gu, (word) => {
    const cleanedWord = word.toLowerCase();

    // Vérifie si le mot est trouvé dans la liste des mots
    if (foundSet.has(cleanedWord)) {
      return word;
    }

    // Si le mot contient une apostrophe, on gère l'apostrophe séparément
    if (word.includes("'")) {
      const parts = word.split("'");
      console.log(parts);
      // Masque les lettres des deux parties du mot séparées par l'apostrophe
      const maskedParts = parts.map((part) =>
        foundSet.has(part.toLowerCase()) ? part : part.replace(/[\p{L}]/gu, "●")
      );
      // Réassemble avec l'apostrophe
      return maskedParts.join("'");
    } else {
      // Sinon, masque tout le mot
      return word.replace(/[\p{L}]/gu, "●");
    }
  });
}
