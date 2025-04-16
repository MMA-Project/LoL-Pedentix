import { createBrowserRouter } from "react-router";
import DailyPedantix from "./DailyPedantix";
import Home from "./Home";
import { DailyPedantixProvider } from "../Context/DailyPedantixContext";

export const router = createBrowserRouter([
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
