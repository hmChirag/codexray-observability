// src/middlewares/authMiddleware.js
import { validateSession, getSession } from "../services/sessionManager.js";

export const verifyToken = (req, res, next) => {
  try {
    // Extract token from "Authorization" header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Handle both "Bearer <token>" and raw token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // Validate the token using sessionManager
    const isValid = validateSession(token);

    if (!isValid) {
      return res.status(403).json({ message: "Invalid or expired session" });
    }

    // Retrieve session info (e.g., username)
    const session = getSession(token);
    if (!session) {
      return res.status(403).json({ message: "Session not found" });
    }

    // Attach user info to request for use in controllers
    req.user = session;
    next();
  } catch (error) {
    console.error("Session verification error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
