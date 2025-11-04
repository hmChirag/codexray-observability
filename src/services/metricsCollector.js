import si from "systeminformation";
import { saveAlert } from "./alertService.js";

const METRIC_INTERVAL = 5000; // every 5 seconds
const CPU_THRESHOLD = 80;
const MEM_THRESHOLD = 75;

let latestMetrics = [];

export async function collectMetrics() {
  try {
    const cpuLoad = await si.currentLoad();
    const memData = await si.mem();

    const cpuUsage = cpuLoad.currentLoad.toFixed(2);
    const memUsage = ((memData.active / memData.total) * 100).toFixed(2);
    const timestamp = new Date().toISOString();

    const metric = { cpuUsage, memUsage, timestamp };
    latestMetrics.push(metric);

    // keep only last 100 readings
    if (latestMetrics.length > 100) latestMetrics.shift();

    // check thresholds & alert
    if (cpuUsage > CPU_THRESHOLD) {
      saveAlert("CPU", cpuUsage, timestamp);
    }
    if (memUsage > MEM_THRESHOLD) {
      saveAlert("Memory", memUsage, timestamp);
    }

    console.log(`🩺 [${timestamp}] CPU:${cpuUsage}%  MEM:${memUsage}%`);
  } catch (err) {
    console.error("Metric collection error:", err.message);
  }
}

export function getLatestMetrics() {
  return latestMetrics;
}

export function startMetricCollector() {
  setInterval(collectMetrics, METRIC_INTERVAL);
  console.log("Metric collector started...");
}
