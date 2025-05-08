import { calculateOccurrences } from "../utils/text";

export function CompletionIndicator({ text }: { text: string[] }) {
  const numberOfGuessedWordInText = calculateOccurrences(
    (cleanedToken) => /^[a-zA-ZÀ-ÿ]+$/.test(cleanedToken),
    text
  );

  const numberOfSynonymsInText = calculateOccurrences(
    (cleanedToken) =>
      cleanedToken.startsWith("[") && cleanedToken.endsWith("]"),
    text
  );

  const numberOfAlmostInText = calculateOccurrences(
    (cleanedToken) =>
      cleanedToken.startsWith("{") && cleanedToken.endsWith("}"),
    text
  );
  const numberOfRemainsWordInText = calculateOccurrences(
    (cleanedToken) => cleanedToken.includes("●"),
    text
  );
  const totalWords =
    numberOfGuessedWordInText +
    numberOfSynonymsInText +
    numberOfAlmostInText +
    numberOfRemainsWordInText;
  const guessedPercentage =
    totalWords > 0
      ? Math.round((numberOfGuessedWordInText / totalWords) * 10)
      : 0;
  const synonymsPercentage =
    totalWords > 0 ? Math.round((numberOfSynonymsInText / totalWords) * 10) : 0;
  const almostPercentage =
    totalWords > 0 ? Math.round((numberOfAlmostInText / totalWords) * 10) : 0;

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: guessedPercentage }).map((_, index) => (
        <div key={index}>🟩</div>
      ))}
      {Array.from({ length: almostPercentage }).map((_, index) => (
        <div key={index}>🟦</div>
      ))}
      {Array.from({ length: synonymsPercentage }).map((_, index) => (
        <div key={index}>🟧</div>
      ))}
      {Array.from({
        length: 10 - synonymsPercentage - guessedPercentage - almostPercentage,
      }).map((_, index) => (
        <div key={index}>🟥</div>
      ))}
    </div>
  );
}
