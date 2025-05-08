export interface PedantixData {
  gameId: string;
  seed: string;
  guessed: boolean;
  text: string;
  triedWords: string[];
  wordTriedWithGuessed: GuessedWord[];
  image?: string;
  title?: string;
}

export interface GuessedWord {
  wordTried: string;
  wordsGuessed: string[];
}
