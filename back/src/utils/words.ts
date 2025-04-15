const normalize = (s: string) =>
    s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

export const getMaskedText = (raw: string, found: string[]) => {
    return raw
        .split(/(\b)/)
        .map((word) => {
            const clean = normalize(word);
            const isWord = /\w+/.test(word);
            return isWord && !found.includes(clean)
                ? "_".repeat(word.length)
                : word;
        })
        .join("");
};
