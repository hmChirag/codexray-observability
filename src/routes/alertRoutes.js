import express from "express";
import { getAlerts, getRecentAlerts } from "../services/alertService.js";

const router = express.Router();

router.get("/", (req, res) => res.json(getAlerts()));
router.get("/recent", (req, res) => res.json(getRecentAlerts(10)));

export default router;
