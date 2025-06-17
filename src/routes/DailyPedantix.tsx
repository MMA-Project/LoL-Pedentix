import { useEffect, useState } from "react";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { fetchDailyGame, fetchHistory, submitGuess } from "../api";
import { SidePanel } from "../components/SidePanel";
import { WordFinded } from "../components/wordFinded";
import { FindedIndicator } from "../components/FindedIndicator";
import { useSearchParams } from "react-router";
import { socket, useCoopRoom } from "../api/websocket";
import { PedantixData } from "../models/PedantixData";
import Select from "react-select";
import { getChampionValueForImage } from "../utils/champions";

export default function DailyPedantix() {
  const [searchParams] = useSearchParams();
  const roomUrlId = searchParams.get("room");
  const { data, updateData, roomId, setHistory, champions } =
    useDailyPedantix();
  const [word, setWord] = useState<string>("");
  const [lastTriedWord, setLastTriedWord] = useState<string>("");
  const { joinRoom } = useCoopRoom();

  useEffect(() => {
    if (roomUrlId && data?.gameId && roomId !== roomUrlId) {
      joinRoom(roomUrlId, data.gameId);
    }
  }, [roomUrlId, data?.gameId]);

  useEffect(() => {
    socket.on("new-guess", ({ game }: { game: PedantixData }) => {
      updateData(game);
    });

    return () => {
      socket.off("new-guess");
    };
  }, []);

  const handleGuess = async (value?: string) => {
    const guess = value || word.trim().toLowerCase();
    if (!guess || !data) return;
    try {
      const response = await submitGuess(data.gameId, guess);
      if (roomId) {
        socket.emit("new-guess", response);
      }
      updateData(response);
      setLastTriedWord(guess);
      setWord("");
      const newHistory = await fetchHistory();
      setHistory(newHistory);
    } catch (error) {
      const newData = await fetchDailyGame();
      updateData(newData);
    }
  };

  const champOptions = champions.map((champion) => ({
    value: champion,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${getChampionValueForImage(
            champion
          )}.png`}
          alt={champion}
          className="w-5 h-5"
        />
        {champion.charAt(0).toUpperCase() + champion.slice(1)}
      </div>
    ),
  }));

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

                {!data.guessed && (
                  <div className="flex flex-row gap-4 items-center pb-2">
                    <Select
                      options={champOptions}
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#1e2328ee",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#1e2328ee",
                          width: "max-content",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          display: "none",
                        }),
                        option: (base, { isFocused }) => {
                          return {
                            ...base,
                            backgroundColor: isFocused
                              ? "#2c3136"
                              : "#1e2328ee",
                            overflowX: "hidden",
                          };
                        },
                      }}
                      value={
                        champOptions.find(
                          (opt) =>
                            opt.value.toLowerCase() === word.toLowerCase()
                        ) || null
                      }
                      onChange={(option) => {
                        if (option) {
                          handleGuess(option.value);
                        }
                      }}
                      isDisabled={data.guessed}
                    />
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleGuess();
                      }}
                    >
                      <input
                        type="text"
                        placeholder={lastTriedWord ?? "Entrez un mot..."}
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
                )}
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
                  <>
                    <div className="flex flex-row flex-wrap">
                      {data.triedWords.map((triedWord) => {
                        const champion = champions.find(
                          (champ) =>
                            champ.toLowerCase() === triedWord.toLowerCase()
                        );
                        return champion ? (
                          <img
                            key={champion}
                            src={`https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/${getChampionValueForImage(
                              champion
                            )}.png`}
                            alt={champion}
                            className="w-10 h-10 m-1 rounded border-2 border-[#d72222] shadow-lg"
                            title={champion}
                          />
                        ) : null;
                      })}
                    </div>
                    <div className=" w-32 h-8 bg-[#8f9194] rounded my-4"></div>
                  </>
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
