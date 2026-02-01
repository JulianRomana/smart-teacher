import { v4 as uuidv4 } from "uuid";

/**
 * Session Management for Local Development
 *
 * Since we're building for local use without authentication,
 * we use localStorage to persist a unique session ID per browser.
 */

const SESSION_ID_KEY = "smart-teacher-session-id";

/**
 * Get or create a session ID from localStorage
 * This should only be called on the client side
 */
export function getSessionId(): string {
  if (typeof window === "undefined") {
    throw new Error("getSessionId() can only be called on the client side");
  }

  let sessionId = localStorage.getItem(SESSION_ID_KEY);

  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Clear the current session (useful for testing or user logout)
 */
export function clearSession(): void {
  if (typeof window === "undefined") {
    throw new Error("clearSession() can only be called on the client side");
  }

  localStorage.removeItem(SESSION_ID_KEY);
}
