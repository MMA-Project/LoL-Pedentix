import express from "express";
import cors from "cors";

import gameRouter from "./routes/game";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Middleware for tracing requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Game routes
app.use("/api/game", gameRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
