import { createBrowserRouter } from "react-router";
import DailyPedantix from "./DailyPedantix";
import Home from "./Home";
import { DailyPedantixProvider } from "../context/DailyPedantixContext";

export const router = createBrowserRouter([
  {
    path: "/LoL-Pedantix/",
    element: <Home />,
  },
  {
    path: "/LoL-Pedantix/daily",
    element: (
      <DailyPedantixProvider>
        <DailyPedantix />
      </DailyPedantixProvider>
    ),
  },
]);
