import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { createSession, validateSession, getSession } from "../services/sessionManager.js";

const usersFile = path.resolve("src/data/users.json");

// 🧠 Helper: Load all users
function loadUsers() {
  if (!fs.existsSync(usersFile)) return {};
  const data = fs.readFileSync(usersFile, "utf8");
  return JSON.parse(data || "{}");
}

// 🧠 Helper: Save all users
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// ✅ Register
export async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const users = loadUsers();

  if (users[username]) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = hashedPassword;
  saveUsers(users);

  res.json({ message: "User registered successfully" });
}

// ✅ Login
export async function login(req, res) {
  const { username, password } = req.body;
  const users = loadUsers();
  const hashedPassword = users[username];

  if (!hashedPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = createSession(username);
  res.json({ message: "Login successful", token });
}

// ✅ Validate Session
export async function validate(req, res) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Missing session token" });
  }

  const isValid = validateSession(token);
  if (!isValid) {
    return res.status(403).json({ error: "Invalid or expired session" });
  }

  const session = getSession(token);
  res.json({ message: "Session valid", session });
}
