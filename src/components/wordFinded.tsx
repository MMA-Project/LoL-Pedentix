export function WordFinded({
  word,
  lastTriedWord,
}: {
  word: string;
  lastTriedWord: string;
}) {
  return (
    <span
      style={{
        color:
          word.toLowerCase() === lastTriedWord.toLowerCase()
            ? "#4CAF50"
            : "inherit",
      }}
    >
      {word}
    </span>
  );
}
