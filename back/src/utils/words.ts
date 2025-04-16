export function getMaskedText(text: string, foundWords: string[]): string {
  const foundSet = new Set(foundWords.map((w) => w.toLowerCase()));

  return text
    .split(/(\b[\wÀ-ÿ']+\b)/g)
    .map((part) => {
      const cleaned = part.toLowerCase();
      if (foundSet.has(cleaned)) return part;

      return /\b[\wÀ-ÿ']+\b/.test(part) ? "●".repeat(part.length) : part;
    })
    .join("");
}
