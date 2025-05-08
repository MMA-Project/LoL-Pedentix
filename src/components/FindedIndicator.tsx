import { useDailyPedantix } from "../context/DailyPedantixContext";
import { calculateOccurrences } from "../utils/text";

export function FindedIndicator({
  text,
  lastTriedWord,
}: {
  text: string[];
  lastTriedWord: string;
}) {
  const { data } = useDailyPedantix();
  const possibleGuessedWords = data?.wordTriedWithGuessed.find(
    (item) => item.wordTried === lastTriedWord
  )?.wordsGuessed;

  const numberOfGuessedWordInText = possibleGuessedWords
    ? calculateOccurrences(
        (cleanedToken) =>
          possibleGuessedWords.some(
            (word) => word.toLowerCase() === cleanedToken
          ),
        text
      )
    : 0;

  const numberOfSynonymsInText = calculateOccurrences(
    (cleanedToken) => "[" + lastTriedWord.toLowerCase() + "]" === cleanedToken,
    text
  );

  const numberOfAlmostInText = calculateOccurrences(
    (cleanedToken) => "{" + lastTriedWord.toLowerCase() + "}" === cleanedToken,
    text
  );

  if (!lastTriedWord) {
    return;
  }

  return (
    <div className="flex">
      {Array.from({ length: numberOfGuessedWordInText }).map((_, index) => (
        <div key={index}>🟩</div>
      ))}
      {Array.from({ length: numberOfAlmostInText }).map((_, index) => (
        <div key={index}>🟦</div>
      ))}
      {Array.from({ length: numberOfSynonymsInText }).map((_, index) => (
        <div key={index}>🟧</div>
      ))}
      {numberOfGuessedWordInText <= 0 && numberOfSynonymsInText <= 0 && (
        <div>🟥</div>
      )}
    </div>
  );
}
