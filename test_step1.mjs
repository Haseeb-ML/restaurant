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

import { pathToFileURL } from 'url';
const dbModuleUrl = pathToFileURL('C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/browserDb.ts').href;
const { handleStandaloneRequest, getCurrentUser, setCurrentUser } = await import(dbModuleUrl);

console.log("=== STEP 1 TEST: PERSISTENT LOGIN & SIGN OUT ===");

// 1. Initial State (no user logged in yet)
let initialUser = getCurrentUser();
console.log("1. Initial user (expected null):", initialUser);
if (initialUser !== null) throw new Error("Expected initialUser to be null");

// 2. Check bootstrap on unauthenticated session
try {
  handleStandaloneRequest("bootstrap");
  throw new Error("Bootstrap should have failed with 401 when not logged in");
} catch (e) {
  console.log("2. Bootstrap properly rejected without login (status 401):", e.status);
  if (e.status !== 401) throw new Error("Expected status 401");
}

// 3. User logs in with Username & Password
const loggedInUser = handleStandaloneRequest("auth/login", { username: "owner", password: "123456" });
console.log("3. User successfully logged in:", loggedInUser.name, "| Role:", loggedInUser.role);
if (!loggedInUser.token) throw new Error("Expected login token");

// 4. Simulate App Restart: Close app and reopen
const restoredUser = getCurrentUser();
console.log("4. On app reopen, user is still logged in:", restoredUser.name, "(No password asked)");
if (restoredUser.username !== "owner") throw new Error("Expected restored user to be owner");

// 5. Bootstrap on reopened app
const bootstrapData = handleStandaloneRequest("bootstrap");
console.log("5. App loads immediately without login screen! User:", bootstrapData.user?.name);
if (!bootstrapData.user || bootstrapData.user.username !== "owner") throw new Error("Bootstrap user mismatch");

// 6. User explicitly clicks "Sign out"
handleStandaloneRequest("auth/logout");
console.log("6. User clicked 'Sign out'");
const userAfterLogout = getCurrentUser();
console.log("7. User state after logout (expected null):", userAfterLogout);
if (userAfterLogout !== null) throw new Error("User should be null after logout");

// 8. Bootstrap after logout should now ask for login (401)
try {
  handleStandaloneRequest("bootstrap");
  throw new Error("Bootstrap should require login after logout");
} catch (e) {
  console.log("8. After logout, login screen is required (status 401):", e.status);
  if (e.status !== 401) throw new Error("Expected status 401 after logout");
}

console.log("\n>>> SUCCESS: STEP 1 (PERSISTENT LOGIN & LOGOUT) PASSED ALL VERIFICATIONS! <<<");
