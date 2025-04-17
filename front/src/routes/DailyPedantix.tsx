import { useState } from "react";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { submitGuess } from "../api";

export default function DailyPedantix() {
  const { data, updateData } = useDailyPedantix();
  const [word, setWord] = useState<string>("");

  const handleGuess = async () => {
    console.log("handleGuess", word);
    if (!word || !data) return;
    const response = await submitGuess(data.gameId, word);
    updateData(response);
    setWord("");
  };

  return (
    <div
      className="min-h-screen p-4 flex items-center justify-center"
      style={{
        backgroundImage: data?.image ? `url(${data.image})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="text-white p-8 rounded-2xl shadow-lg w-full max-w-6xl">
        <div
          className="text-3xl font-bold px-6 py-3 rounded-lg mb-8 text-center"
          style={{
            backgroundColor: "#1e2328ee",
            border: "2px solid #af9767",
          }}
        >
          League of Legends Pétendix
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
            {!data.guessed && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGuess();
                }}
              >
                <input
                  type="text"
                  placeholder="Entrez un mot..."
                  className="w-full p-3 mb-6 text-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                />
              </form>
            )}
            {data.title ? (
              <div className="flex items-center space-x-4 py-4">
                {data.image && (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${
                      data.title.charAt(0).toUpperCase() + data.title.slice(1)
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
              <div className=" w-32 h-8 bg-white rounded"></div>
            )}
            {data.text.split("\n").map((line, lineIndex) => (
              <div key={lineIndex} className="mb-2">
                {line
                  .match(/([●’'\wÀ-ÿ]+|[.,!?;:]|\s+)/g)
                  ?.map((token, index) => {
                    if (token.includes("●")) {
                      // On veut savoir si une apostrophe est au milieu
                      const parts = token.split(/(['’])/); // garde l’apostrophe comme un token

                      return (
                        <span
                          key={index}
                          className="inline-block align-baseline mx-[2px]"
                        >
                          {parts.map((part, i) =>
                            part.includes("●") ? (
                              <div
                                key={i}
                                className="inline-block h-3.5 bg-white rounded align-baseline"
                                style={{
                                  width: `${part.length * 8}px`,
                                  marginLeft: i > 0 ? "2px" : 0,
                                }}
                              ></div>
                            ) : (
                              <span key={i}>{part}</span>
                            )
                          )}
                        </span>
                      );
                    }

                    // Sinon, texte normal ou ponctuation ou espace
                    return <span key={index}>{token}</span>;
                  })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
