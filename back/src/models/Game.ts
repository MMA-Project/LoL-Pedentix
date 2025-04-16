export default interface Game {
  id: string;
  seed: string;
  mode: string;
  guessed: boolean;
  image: string;
  name: string;
  rawText: string;
  foundWords: string[];
}
