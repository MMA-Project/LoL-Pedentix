import { createHashRouter } from "react-router";
import DailyPedantix from "./DailyPedantix";
import Home from "./Home";
import { DailyPedantixProvider } from "../context/DailyPedantixContext";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daily",
    element: (
      <DailyPedantixProvider>
        <DailyPedantix />
      </DailyPedantixProvider>
    ),
  },
]);
