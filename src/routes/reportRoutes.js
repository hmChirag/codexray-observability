import express from "express";
import { getReport } from "../controllers/reportController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", verifyToken, getReport);

export default router;
