import { useEffect, useState } from "react";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { CompletionIndicator } from "./CompletionIndicator";
import { GameModal } from "./GameModal";
import { socket } from "../api/websocket";

export const SidePanel = () => {
  const { data, history, roomId } = useDailyPedantix();
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "info" | "history" | "coop" | null
  >(null);
  const [playersCount, setPlayersCount] = useState<number>(1);

  useEffect(() => {
    socket.on("room-update", ({ size }) => {
      setPlayersCount(size);
    });

    return () => {
      socket.off("room-update");
    };
  }, []);

  const words = data?.triedWords || [];
  const displayedWords = showAll
    ? words.slice().reverse()
    : words.slice(-5).reverse();

  function openModal(type: "info" | "history" | "coop") {
    setModalType(type);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div
      className="font-bold px-6 py-3 rounded-lg text-center h-fit"
      style={{
        backgroundColor: "#1e2328ee",
        border: "2px solid #af9767",
      }}
    >
      <GameModal isOpen={modalIsOpen} onClose={closeModal} type={modalType} />
      <div className="flex-row justify-around">
        <div className="flex justify-around mb-4">
          <button
            aria-label="Informations"
            className="text-[#af9767] hover:text-white text-2xl mx-2 cursor-pointer"
            onClick={() => {
              openModal("info");
            }}
            type="button"
          >
            <span role="img" aria-label="info">
              ℹ️
            </span>
          </button>
          <button
            aria-label="Historique"
            className="text-[#af9767] hover:text-white text-2xl mx-2 cursor-pointer"
            onClick={() => {
              openModal("history");
            }}
            type="button"
          >
            <span role="img" aria-label="history">
              📜
            </span>
          </button>
          <button
            aria-label="Coop"
            className="text-[#af9767] hover:text-white text-2xl mx-2 relative cursor-pointer"
            onClick={() => {
              openModal("coop");
            }}
            type="button"
          >
            <span role="img" aria-label="coop">
              🤝
            </span>
            {roomId && playersCount && (
              <span
                className="absolute top-0 right-0 text-xs bg-[#af9767] text-black rounded-full px-1"
                style={{ transform: "translate(50%,-50%)" }}
              >
                {playersCount}
              </span>
            )}
          </button>
        </div>
      </div>
      <div>Jour n° {history.length}</div>
      {history[0] && <div>Trouvé par {history[0].findedCount} personnes</div>}
      <CompletionIndicator text={data!!.text.split("\n").slice(0, 5)} />
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-2 py-1">N°</th>
            <th className="px-2 py-1">Mot</th>
          </tr>
        </thead>
        <tbody>
          {displayedWords.map((word: string, index: number) => (
            <tr key={index}>
              <td className="px-2 py-1 text-center">{words.length - index}</td>
              <td className="px-2 py-1 text-center">{word}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showAll && words.length > 5 && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-2 text-[#af9767] hover:text-white text-sm"
        >
          ↓ Voir tous les mots
        </button>
      )}
      {showAll && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-2 text-[#af9767] hover:text-white text-sm"
        >
          ↑ Voir moins
        </button>
      )}
      {history[1] && (
        <div className="mt-4 text-sm text-[#af9767]">
          Le champion d'hier était{" "}
          {history[1].name.charAt(0).toUpperCase() + history[1].name.slice(1)}
        </div>
      )}
    </div>
  );
};
