export default function DailyPedantix() {
  // const { game, setGame } = useContext(GameContext);
  // const { id } = useParams<{ id: string }>();
  // const [word, setWord] = useState("");
  // const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 flex items-center justify-center">
      <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <div className="bg-gray-800 text-3xl font-bold px-6 py-3 rounded-lg mb-8 text-center">
          League of Legends Pétendix
        </div>

        <div className="bg-gray-800 p-8 rounded-2xl">
          <input
            type="text"
            placeholder="Entrez un mot..."
            className="w-full p-3 mb-6 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="space-y-4">{/* Add content here */}</div>
        </div>
      </div>
    </div>
  );
}
