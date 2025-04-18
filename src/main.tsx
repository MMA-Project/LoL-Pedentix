import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router } from "react-router";
import { Layout } from "./layout";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Layout />
  </Router>
);
