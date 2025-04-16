export default interface Game {
  id: string;
  seed: string;
  mode: string;
  image: string;
  name: string;
  rawText: string;
  foundWords: string[];
}
