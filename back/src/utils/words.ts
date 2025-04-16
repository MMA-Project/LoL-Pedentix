export function getMaskedText(text: string, foundWords: string[]): string {
  const foundSet = new Set(foundWords.map((w) => w.toLowerCase()));

  return text.replace(/\b[\p{L}]+(?:'[\p{L}]+)*\b/gu, (word) => {
    const cleanedWord = word.toLowerCase();
    return foundSet.has(cleanedWord) ? word : word.replace(/\p{L}/gu, "●");
  });
}
