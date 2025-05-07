import { useDailyPedantix } from "../context/DailyPedantixContext";

export const SidePanel = () => {
  const { data } = useDailyPedantix();
  return (
    <div
      className="font-bold w-56 px-6 py-3 rounded-lg text-center h-fit"
      style={{
        backgroundColor: "#1e2328ee",
        border: "2px solid #af9767",
      }}
    >
      <div>Jour n° {new Date().getDate()}</div>
      <div>Trouvé par 1000 personnes</div>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-2 py-1">N°</th>
            <th className="px-2 py-1">Mot</th>
          </tr>
        </thead>
        <tbody>
          {data?.triedWords
            ?.slice(-5)
            .reverse()
            .map((word: string, index: number) => (
              <tr key={index}>
                <td className=" px-2 py-1 text-center">
                  {data.triedWords.length - index}
                </td>
                <td className=" px-2 py-1 text-center">{word}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          const allWords = data?.triedWords || [];
          alert("Tous les mots :\n" + allWords.join(", "));
        }}
      >
        Afficher tous les mots
      </button>
    </div>
  );
};
