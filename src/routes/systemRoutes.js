// src/routes/systemRoutes.js
import express from "express";
import si from "systeminformation";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/metrics", verifyToken, async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();

    res.json({
      cpuLoad: cpu.currentLoad.toFixed(2),
      usedMemoryPercent: ((1 - mem.available / mem.total) * 100).toFixed(2),
      diskUsedGB: (disk[0].used / 1e9).toFixed(2),
      diskTotalGB: (disk[0].size / 1e9).toFixed(2),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching system metrics" });
  }
});

export default router;
