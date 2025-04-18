import { Route, Routes, useLocation } from "react-router";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { DailyPedantixProvider } from "./context/DailyPedantixContext";
import { Page404 } from "./routes/404";
import DailyPedantix from "./routes/DailyPedantix";
import Home from "./routes/Home";

export const Layout = () => {
  const location = useLocation();
  const larger = location.pathname === "/";
  return (
    <div>
      <Header larger={larger} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/daily"
          element={
            <DailyPedantixProvider>
              <DailyPedantix />
            </DailyPedantixProvider>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </div>
  );
};
