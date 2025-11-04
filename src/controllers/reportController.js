// src/controllers/reportController.js
import fs from "fs";
import path from "path";
import si from "systeminformation";

const alertsFile = path.resolve("src/data/alerts.json");

// Helper to load alerts
const loadAlerts = () => {
  if (!fs.existsSync(alertsFile)) return [];
  const data = fs.readFileSync(alertsFile, "utf-8");
  return JSON.parse(data || "[]");
};

// ✅ Named export (important!)
export const getReport = async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();

    const alerts = loadAlerts();
    const totalAlerts = alerts.length;

    const breakdown = alerts.reduce((acc, a) => {
      acc[a.type] = (acc[a.type] || 0) + 1;
      return acc;
    }, {});

    const report = {
      timestamp: new Date().toISOString(),
      averages: {
        cpuLoad: cpu.currentLoad.toFixed(2),
        totalMemGB: (mem.total / 1e9).toFixed(2),
        usedMemGB: ((mem.total - mem.available) / 1e9).toFixed(2),
        usedMemPercent: ((1 - mem.available / mem.total) * 100).toFixed(2),
        diskUsageGB: disk
          .reduce((sum, d) => sum + d.used / 1e9, 0)
          .toFixed(2),
      },
      alerts: {
        total: totalAlerts,
        breakdown,
      },
    };

    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating report" });
  }
};
