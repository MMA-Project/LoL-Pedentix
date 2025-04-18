import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchDailyGame, fetchGameById } from "../api";

interface DailyPedantixData {
  gameId: string;
  seed: string;
  guessed: boolean;
  text: string;
  foundWords: string[];
  image?: string;
  title?: string;
}

interface DailyPedantixContextType {
  data: DailyPedantixData | null;
  updateData: (data: DailyPedantixData) => void;
}

// 👇 ici on crée bien le contexte avec le bon type
export const DailyPedantixContext = createContext<DailyPedantixContextType>(
  {} as DailyPedantixContextType
);

// 👇 le provider doit avoir un nom différent du contexte
export const DailyPedantixProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<DailyPedantixData | null>(null);

  const updateData = (newData: DailyPedantixData) => {
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
        }
      } catch (error) {
        const newData = await fetchDailyGame();
        updateData(newData);
      }
    };
    fetchData();
  }, [data]);

  return (
    <DailyPedantixContext.Provider value={{ data, updateData }}>
      {children}
    </DailyPedantixContext.Provider>
  );
};

// 👇 le hook personnalisé
export const useDailyPedantix = () => {
  const context = useContext(DailyPedantixContext);
  if (!context) {
    throw new Error(
      "useDailyPedantix must be used within a DailyPedantixProvider"
    );
  }
  return context;
};
