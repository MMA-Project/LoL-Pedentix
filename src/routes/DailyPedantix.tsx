import { useState } from "react";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { fetchDailyGame, submitGuess } from "../api";
import { SidePanel } from "../components/SidePanel";
import { WordFinded } from "../components/wordFinded";
import { FindedIndicator } from "../components/FindedIndicator";

export default function DailyPedantix() {
  const { data, updateData } = useDailyPedantix();
  const [word, setWord] = useState<string>("");
  const [lastTriedWord, setLastTriedWord] = useState<string>("");

  const handleGuess = async () => {
    if (!word || !data) return;
    try {
      const response = await submitGuess(data.gameId, word);
      updateData(response);
      setLastTriedWord(word);
      setWord("");
    } catch {
      const newData = await fetchDailyGame();
      updateData(newData);
    }
  };

  return (
    <div className="p-4 flex items-center justify-center">
      <div
        className="top-0 left-0 w-full h-full bg-cover bg-center fixed"
        style={{
          backgroundImage: data?.image ? `url(${data.image})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          zIndex: -1,
        }}
      />
      {data && (
        <div className="text-white p-8 w-full flex flex-row gap-10 animate-fade animate-ease-in-out">
          <SidePanel />
          <div>
            <div
              className="text-3xl font-bold px-6 py-3 rounded-lg mb-8 text-center"
              style={{
                backgroundColor: "#1e2328ee",
                border: "2px solid #af9767",
              }}
            >
              League of Legends Pédantix du jour
            </div>

            {data && (
              <div
                className="p-8 rounded-2xl"
                style={{
                  backgroundColor: "#1e2328ee",
                  border: "2px solid #af9767",
                }}
              >
                <div className="text-lg mb-4">
                  {data.guessed
                    ? "Bravo, vous avez trouvé le champion !"
                    : "Essayez de trouver le champion ! "}
                </div>
                <div className="flex flex-row gap-8 items-center pb-2">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleGuess();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Entrez un mot..."
                      className=" px-2 py-1 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      disabled={data.guessed}
                    />
                  </form>
                  <FindedIndicator
                    text={data.text.split("\n").slice(0, 5)}
                    lastTriedWord={lastTriedWord}
                  />
                </div>
                {data.title ? (
                  <div className="flex items-center space-x-4 py-4">
                    {data.image && (
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${
                          data.title.charAt(0).toUpperCase() +
                          data.title.slice(1)
                        }.png`}
                        alt={data.title}
                        className="w-32 h-32 shadow-lg"
                      />
                    )}
                    <div className="text-4xl text-center">
                      {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                    </div>
                  </div>
                ) : (
                  <div className=" w-32 h-8 bg-[#8f9194] rounded my-4"></div>
                )}
                {data.text
                  .split("\n")
                  .slice(0, 5)
                  .map((line, lineIndex) => (
                    <p key={lineIndex} className="mb-2 leading-8">
                      {line
                        .match(/(\[.*?\]|[{●\wÀ-ÿ}]+|[{}.,’'!?;:-]|\s+)/g)
                        ?.map((token, index) => {
                          // Cas d'un mot entre crochets
                          if (token.startsWith("[") && token.endsWith("]")) {
                            const cleanToken = token.slice(1, -1); // enlever les crochets
                            return (
                              <span
                                key={index}
                                className="inline bg-[#5e6063] rounded align-baseline items-center justify-center px-1"
                                style={{
                                  color:
                                    cleanToken.toLowerCase() ===
                                    lastTriedWord.toLowerCase()
                                      ? "#FF8C00" // A more visible orange
                                      : "",
                                }}
                              >
                                {cleanToken}
                              </span>
                            );
                          }
                          // Cas d'un mot entre accolades
                          if (token.startsWith("{") && token.endsWith("}")) {
                            const cleanToken = token.slice(1, -1); // enlever les crochets
                            return (
                              <span
                                key={index}
                                className="inline bg-[#5e6063] rounded align-baseline items-center justify-center px-1"
                                style={{
                                  color:
                                    cleanToken.toLowerCase() ===
                                    lastTriedWord.toLowerCase()
                                      ? "#40a9ff"
                                      : "",
                                }}
                              >
                                {"~" + cleanToken}
                              </span>
                            );
                          }

                          // Cas des mots avec des ●
                          if (token.includes("●")) {
                            return (
                              <span
                                key={index}
                                className="inline bg-[#8f9194] rounded align-baseline text-[#ffffff00]"
                              >
                                {token}
                              </span>
                            );
                          }

                          // Sinon, texte normal
                          return (
                            <WordFinded
                              key={index}
                              word={token}
                              lastTriedWord={lastTriedWord}
                            />
                          );
                        })}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
