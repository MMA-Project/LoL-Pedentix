import { useDailyPedantix } from "../context/DailyPedantixContext";

export function WordFinded({
  word,
  lastTriedWord,
}: {
  word: string;
  lastTriedWord: string;
}) {
  const { data } = useDailyPedantix();
  return (
    <span
      style={{
        color: data?.wordTriedWithGuessed
          .find(
            (item) =>
              item.wordTried.toLowerCase() === lastTriedWord.toLowerCase()
          )
          ?.wordsGuessed.includes(word.toLowerCase())
          ? "#4CAF50"
          : "inherit",
      }}
    >
      {word}
    </span>
  );
}
