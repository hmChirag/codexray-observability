import express from "express";
import { analyzeLogs } from "../services/logAnalyzer.js";

const router = express.Router();

router.get("/analyze", async (req, res) => {
  try {
    const result = await analyzeLogs();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
