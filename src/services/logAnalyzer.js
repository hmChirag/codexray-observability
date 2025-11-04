import fs from "fs";
import path from "path";

export async function analyzeLogs() {
  const logFilePath = path.resolve("sample_logs/app.log");

  // Read the file content
  const data = fs.readFileSync(logFilePath, "utf8");
  const lines = data.split("\n");

  // Counters using Map (for performance)
  let levelCount = { INFO: 0, WARN: 0, ERROR: 0 };
  let errorFrequency = new Map();

  for (let line of lines) {
    if (line.includes("INFO")) levelCount.INFO++;
    if (line.includes("WARN")) levelCount.WARN++;
    if (line.includes("ERROR")) {
      levelCount.ERROR++;

      // Extract error message
      const message = line.split("ERROR")[1]?.trim() || "Unknown Error";
      if (message) {
        errorFrequency.set(message, (errorFrequency.get(message) || 0) + 1);
      }
    }
  }

  // Sort errors by frequency (top 5)
  const topErrors = [...errorFrequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    levelCount,
    topErrors,
  };
}

