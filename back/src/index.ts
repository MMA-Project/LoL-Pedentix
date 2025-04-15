import express from "express";
import cors from "cors";

import gameRouter from "./routes/game";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Game routes
app.use("/api/game", gameRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });