import { useState } from "react";
import { useDailyPedantix } from "../context/DailyPedantixContext";
import { CompletionIndicator } from "./CompletionIndicator";

export const SidePanel = () => {
  const { data } = useDailyPedantix();
  const [showAll, setShowAll] = useState(false);

  const words = data?.triedWords || [];
  const displayedWords = showAll
    ? words.slice().reverse()
    : words.slice(-5).reverse();

  return (
    <div
      className="font-bold w-2/3 px-6 py-3 rounded-lg text-center h-fit"
      style={{
        backgroundColor: "#1e2328ee",
        border: "2px solid #af9767",
      }}
    >
      <div>Jour n° {new Date().getDate()}</div>
      <div>Trouvé par 1000 personnes</div>
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
    </div>
  );
};
