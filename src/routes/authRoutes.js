import express from "express";
import { register, login ,validate } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/validate-session", validate);
export default router;

