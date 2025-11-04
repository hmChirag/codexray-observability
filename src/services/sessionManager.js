import { v4 as uuidv4 } from "uuid";

const sessions = new Map();

export function createSession(username) {
  const token = uuidv4();
  sessions.set(token, { username, createdAt: Date.now() });
  return token;
}

export function validateSession(token) {
  return sessions.has(token);
}

export function getSession(token) {
  return sessions.get(token);
}

export function deleteSession(token) {
  sessions.delete(token);
}
