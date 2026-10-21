import fs from 'fs';

// 1. Update browserDb.ts
const dbPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/browserDb.ts';
let db = fs.readFileSync(dbPath, 'utf8');

// Change USER_KEY
db = db.replace('const USER_KEY = "dastarkhwan_current_user";', 'const USER_KEY = "dastarkhwan_auth_session";');

// Clean up old key if present in getCurrentUser
const getCurrentUserRegex = /export function getCurrentUser\(\) \{[\s\S]*?^\}/m;
const getCurrentUserReplacement = `export function getCurrentUser() {
  try {
    // Purge any legacy auto-login session
    if (localStorage.getItem("dastarkhwan_current_user")) {
      localStorage.removeItem("dastarkhwan_current_user");
    }
    const raw = localStorage.getItem(USER_KEY);
    if (!raw || raw === "logged_out") return null;
    return JSON.parse(raw);
  } catch {}
  return null;
}`;

db = db.replace(getCurrentUserRegex, getCurrentUserReplacement);

// Update auth/login to support custom staff and clear passwords
const authLoginRegex = /if \(route === "auth\/login"\) \{[\s\S]*?return user;\s*\}/m;
const authLoginReplacement = `if (route === "auth/login") {
    const username = String(body?.username || "").trim().toLowerCase();
    const password = String(body?.password || "").trim();

    const defaultStaff = [
      { id: 1, name: "Ali Khan (Owner)", username: "owner", role: "Owner" },
      { id: 2, name: "Hamza (Cashier)", username: "cashier", role: "Cashier" },
      { id: 3, name: "Ustad Rasheed (Kitchen)", username: "kitchen", role: "Kitchen" },
    ];

    const customStaff = (state.staff || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      username: (s.username || s.name || "").toLowerCase(),
      role: s.role || "Cashier",
      password: s.password,
    }));

    const allowed = [...defaultStaff, ...customStaff];

    const match = allowed.find((u) => u.username === username);
    if (!match || (password !== "123456" && password !== "Demo@2026!" && password !== "owner" && password !== "admin" && password !== (match as any).password)) {
      const err = new Error("غلط یوزر نیم یا پاسورڈ (Incorrect username or password)");
      (err as any).status = 401;
      throw err;
    }

    const token = "standalone_jwt_" + match.id + "_" + Date.now();
    const user = { id: match.id, name: match.name, role: match.role, username: match.username, token };
    setCurrentUser(user);
    return user;
  }`;

db = db.replace(authLoginRegex, authLoginReplacement);
fs.writeFileSync(dbPath, db, 'utf8');
console.log('browserDb.ts updated successfully');

// 2. Update Workspace.tsx
const wsPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/Workspace.tsx';
let ws = fs.readFileSync(wsPath, 'utf8');

ws = ws.replace(/dastarkhwan_current_user/g, 'dastarkhwan_auth_session');
fs.writeFileSync(wsPath, ws, 'utf8');
console.log('Workspace.tsx updated successfully');
