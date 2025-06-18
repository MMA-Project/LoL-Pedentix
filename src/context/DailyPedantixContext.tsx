import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  fetchChampions,
  fetchDailyGame,
  fetchGameById,
  fetchHistory,
} from "../api";
import { PedantixData } from "../models/PedantixData";
import HistoryRecord from "../models/History";

interface DailyPedantixContextType {
  data: PedantixData | null;
  updateData: (data: PedantixData) => void;
  history: HistoryRecord[];
  roomId: string | null;
  setRoomId: (roomId: string | null) => void;
  setHistory: (history: HistoryRecord[]) => void;
  champions: string[];
}

export const DailyPedantixContext = createContext<DailyPedantixContextType>(
  {} as DailyPedantixContextType
);

export const DailyPedantixProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<PedantixData | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [champions, setChampions] = useState<string[]>([]);

  const updateData = (newData: PedantixData) => {
    setData(newData);
    localStorage.setItem("dailyPedantixData", JSON.stringify(newData));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data) {
          const storedData = localStorage.getItem("dailyPedantixData");
          const parsedData = storedData ? JSON.parse(storedData) : null;
          await fetchGameById(parsedData.gameId);
          updateData(parsedData);
          const newHistory = await fetchHistory();
          setHistory(newHistory);
          const newChampions = await fetchChampions();
          setChampions(newChampions);
        }
      } catch {
        // console.error("Error fetching daily game:", error);
        const newData = await fetchDailyGame();
        updateData(newData);
        const newHistory = await fetchHistory();
        setHistory(newHistory);
        const newChampions = await fetchChampions();
        setChampions(newChampions);
      }
    };
    fetchData();
  }, [data, history]);

  return (
    <DailyPedantixContext.Provider
      value={{
        data,
        updateData,
        history,
        roomId,
        setRoomId,
        setHistory,
        champions,
      }}
    >
      {children}
    </DailyPedantixContext.Provider>
  );
};

export const useDailyPedantix = () => {
  const context = useContext(DailyPedantixContext);
  if (!context) {
    throw new Error(
      "useDailyPedantix must be used within a DailyPedantixProvider"
    );
  }
  return context;
};
