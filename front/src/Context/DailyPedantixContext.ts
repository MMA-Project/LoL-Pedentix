import React, { createContext, useContext, useState } from "react";

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
  setData: (data: DailyPedantixData) => void;
}

// 👇 ici on crée bien le contexte avec le bon type
export const DailyPedantixContext = createContext<DailyPedantixContextType>(
  {} as DailyPedantixContextType
);

// 👇 le provider doit avoir un nom différent du contexte
export const DailyPedantixProvider = ({ children }: any) => {
  const [data, setData] = useState<DailyPedantixData | null>(null);

  return (
    <DailyPedantixContext.Provider value={{ data, setData }}>
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
