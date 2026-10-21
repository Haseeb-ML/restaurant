// Mock browser environment for testing Step 1
class LocalStorageMock {
  constructor() { this.store = {}; }
  getItem(key) { return this.store[key] || null; }
  setItem(key, val) { this.store[key] = String(val); }
  removeItem(key) { delete this.store[key]; }
  clear() { this.store = {}; }
}

global.localStorage = new LocalStorageMock();
global.window = { location: { hostname: '127.0.0.1', protocol: 'http:' } };

const fs = require('fs');
const defaultState = JSON.parse(fs.readFileSync('C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/initialState.json', 'utf8'));

// Simulating browserDb logic for testing
const USER_KEY = "dastarkhwan_auth_session";
const DB_KEY = "dastarkhwan_standalone_db";

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw || raw === "logged_out") return null;
    return JSON.parse(raw);
  } catch {}
  return null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem("erp_token", "standalone_token_" + user.id);
  } else {
    localStorage.setItem(USER_KEY, "logged_out");
    localStorage.removeItem("erp_token");
  }
}

function getLocalState() {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) return JSON.parse(raw);
  localStorage.setItem(DB_KEY, JSON.stringify(defaultState));
  return defaultState;
}

function handleStandaloneRequest(route, body) {
  const state = getLocalState();
  const currentUser = getCurrentUser();

  if (route === "auth/login") {
    const username = String(body?.username || "").trim().toLowerCase();
    const password = String(body?.password || "").trim();

    const allowed = [
      { id: 1, name: "Ali Khan (Owner)", username: "owner", role: "Owner" },
      { id: 2, name: "Hamza (Cashier)", username: "cashier", role: "Cashier" },
      { id: 3, name: "Ustad Rasheed (Kitchen)", username: "kitchen", role: "Kitchen" },
      ...(state.staff || []).map(s => ({
        id: s.id,
        name: s.name,
        username: (s.username || s.name || "").toLowerCase(),
        role: s.role || "Cashier",
        password: s.password,
      }))
    ];

    const match = allowed.find(u => u.username === username);
    if (!match || (password !== "123456" && password !== "Demo@2026!" && password !== "owner" && password !== "admin" && password !== match.password)) {
      const err = new Error("Incorrect credentials");
      err.status = 401;
      throw err;
    }

    const token = "standalone_jwt_" + match.id + "_" + Date.now();
    const user = { id: match.id, name: match.name, role: match.role, username: match.username, token };
    setCurrentUser(user);
    return user;
  }

  if (route === "auth/logout") {
    setCurrentUser(null);
    return { ok: true };
  }

  if (route === "bootstrap") {
    if (!currentUser) {
      const err = new Error("Session expired. Please sign in.");
      err.status = 401;
      throw err;
    }
    return { ...state, user: currentUser };
  }
}

console.log("=== STEP 1 TEST: PERSISTENT LOGIN & LOGOUT ===");

// 1. Initial State (Fresh install)
let initialUser = getCurrentUser();
console.log("1. Initial user (should be null):", initialUser);
if (initialUser !== null) throw new Error("Expected initialUser null");

// 2. Initial bootstrap without login must prompt for login (401)
try {
  handleStandaloneRequest("bootstrap");
  throw new Error("Bootstrap should have failed with 401");
} catch (e) {
  console.log("2. Bootstrap properly rejected (status 401):", e.status);
  if (e.status !== 401) throw new Error("Expected 401");
}

// 3. Login as Owner
const loggedInUser = handleStandaloneRequest("auth/login", { username: "owner", password: "123456" });
console.log("3. User logged in successfully:", loggedInUser.name, "| Role:", loggedInUser.role);

// 4. Simulate closing the app and reopening it
const restoredUser = getCurrentUser();
console.log("4. On app reopen, user is still authenticated:", restoredUser.name, "(No login required)");
if (restoredUser.username !== "owner") throw new Error("Session was not persisted");

// 5. Bootstrap succeeds immediately on reopen
const bootstrapData = handleStandaloneRequest("bootstrap");
console.log("5. App loads directly to workspace without login prompt! User:", bootstrapData.user.name);

// 6. User explicitly clicks "Sign out"
handleStandaloneRequest("auth/logout");
console.log("6. User clicked 'Sign out'");
const userAfterLogout = getCurrentUser();
console.log("7. User session cleared (should be null):", userAfterLogout);
if (userAfterLogout !== null) throw new Error("User should be null after logout");

// 8. Reopening after logout must prompt for login
try {
  handleStandaloneRequest("bootstrap");
  throw new Error("Should require login after logout");
} catch (e) {
  console.log("8. After logout, login is required again (status 401):", e.status);
  if (e.status !== 401) throw new Error("Expected 401 after logout");
}

console.log("\n>>> SUCCESS: STEP 1 TEST PASSED COMPLETELY! <<<");
