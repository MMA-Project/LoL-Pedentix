import { createBrowserRouter } from "react-router";
import DailyPedantix from "./DailyPedantix";
import Home from "./Home";
import { DailyPedantixProvider } from "../context/DailyPedantixContext";

export const router = createBrowserRouter([
  {
    path: "/LoL-Pedentix/",
    element: <Home />,
  },
  {
    path: "/LoL-Pedentix/daily",
    element: (
      <DailyPedantixProvider>
        <DailyPedantix />
      </DailyPedantixProvider>
    ),
  },
]);
