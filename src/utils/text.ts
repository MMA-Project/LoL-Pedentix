export const calculateOccurrences = (
  condition: (cleanedToken: string) => boolean,
  text: string[]
) =>
  text.reduce((totalCount, line) => {
    const tokens = line.match(/(\[.*?\]|[{●\wÀ-ÿ}]+|[{}.,’'!?;:-]|\s+)/g) || [];
    const countInLine = tokens.reduce((count, token) => {
      const cleanedToken = token.trim().toLowerCase();
      return count + (condition(cleanedToken) ? 1 : 0);
    }, 0);
    return totalCount + countInLine;
  }, 0);
