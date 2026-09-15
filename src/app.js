import express from "express";
import candidateRoutes from "./routes/candidateRoutes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.use("/candidates", candidateRoutes);

export default app;