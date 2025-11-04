import express from "express";
import { startMetricCollector } from "./services/metricsCollector.js";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import cors from "cors";
import systemRoutes from "./routes/systemRoutes.js";

dotenv.config();
const app = express();


app.use(cors()); 
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));    
app.use(morgan("dev"));
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/reports", reportRoutes);
app.use(express.static("public"));
app.use(express.static("src/dashboard"));
app.use("/api/system", systemRoutes);


app.get("/", (req, res) => {
  res.send("CodeXray Microservice running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startMetricCollector();
});
