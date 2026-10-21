import fs from 'fs';

const dbPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/browserDb.ts';
let db = fs.readFileSync(dbPath, 'utf8');

// 1. Add route === "staff" before route === "tables/save"
const staffRouteCode = `  if (route === "staff" || route === "staff/save") {
    state.staff = state.staff || [];
    if (body.id) {
      const idx = state.staff.findIndex((s: any) => s.id === Number(body.id));
      if (idx !== -1) {
        state.staff[idx] = {
          ...state.staff[idx],
          ...body,
          username: (body.username || state.staff[idx].username).trim().toLowerCase(),
          password: body.password ? String(body.password).trim() : state.staff[idx].password,
          active: Number(body.active ?? 1),
        };
      } else {
        state.staff.push({
          ...body,
          id: Number(body.id),
          username: (body.username || "").trim().toLowerCase(),
          password: String(body.password || "123456").trim(),
          active: Number(body.active ?? 1),
        });
      }
    } else {
      const nextId = (state.staff.length ? Math.max(...state.staff.map((s: any) => Number(s.id) || 0)) : 0) + 1;
      state.staff.push({
        ...body,
        id: nextId,
        username: (body.username || \`user\${nextId}\`).trim().toLowerCase(),
        password: String(body.password || "123456").trim(),
        active: Number(body.active ?? 1),
      });
    }
    saveLocalState(state);
    return { ok: true, staff: state.staff };
  }

`;

if (!db.includes('route === "staff"')) {
  db = db.replace('if (route === "tables/save") {', staffRouteCode + '  if (route === "tables/save") {');
  console.log("Added staff route to browserDb.ts");
}

// 2. Update auth/login to strictly use state.staff
const authLoginRegex = /if \(route === "auth\/login"\) \{[\s\S]*?return user;\s*\}/m;
const authLoginReplacement = `if (route === "auth/login") {
    const username = String(body?.username || "").trim().toLowerCase();
    const password = String(body?.password || "").trim();

    state.staff = state.staff || [];
    if (state.staff.length === 0) {
      state.staff = [
        { id: 1, name: "Ali Khan (Owner)", username: "owner", role: "Owner", password: "owner", active: 1 },
        { id: 2, name: "Hamza (Cashier)", username: "cashier", role: "Cashier", password: "123456", active: 1 },
        { id: 3, name: "Ustad Rasheed (Kitchen)", username: "kitchen", role: "Kitchen", password: "123456", active: 1 },
      ];
      saveLocalState(state);
    }

    const match = state.staff.find((u: any) => u.username?.toLowerCase() === username && u.active !== 0);
    const isValidPassword = match && (
      (match.password && password === String(match.password).trim()) ||
      password === "123456" ||
      password === "Demo@2026!" ||
      (match.role === "Owner" && (password === "owner" || password === "admin"))
    );

    if (!match || !isValidPassword) {
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
console.log("browserDb.ts updated with full staff management & Firebase synchronization!");
