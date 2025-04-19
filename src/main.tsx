import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router";
import { Layout } from "./layout";

createRoot(document.getElementById("root")!).render(
  <Router basename="/LoL-Pedentix/">
    <Layout />
  </Router>
);
