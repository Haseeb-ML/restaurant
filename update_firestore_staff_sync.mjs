import fs from 'fs';

// 1. Update firestoreSync.ts
const fsPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/firestoreSync.ts';
let fsCode = fs.readFileSync(fsPath, 'utf8');

const staffSyncCode = `
export async function syncStaffToFirestore(user: any) {
  try {
    const docId = user.docId || \`user_\${(user.username || user.id || 'staff').toLowerCase().replace(/[^a-z0-9]/g, '_')}\`;
    const payload = {
      fields: toFirestoreFields({
        id: user.id,
        name: user.name,
        username: (user.username || '').toLowerCase(),
        role: user.role || 'Cashier',
        password: user.password || '123456',
        active: user.active ?? 1,
        updated: new Date().toISOString(),
      }),
    };

    // Save to users collection
    const usersUrl = \`\${FIRESTORE_BASE}/users/\${docId}?key=\${FIRESTORE_API_KEY}\`;
    await fetch(usersUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Also mirror to staff collection
    const staffUrl = \`\${FIRESTORE_BASE}/staff/\${docId}?key=\${FIRESTORE_API_KEY}\`;
    await fetch(staffUrl, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn("Failed to sync staff user to Firestore:", e);
  }
}

export async function deleteStaffFromFirestore(docId: string) {
  try {
    await fetch(\`\${FIRESTORE_BASE}/users/\${docId}?key=\${FIRESTORE_API_KEY}\`, { method: "DELETE" });
    await fetch(\`\${FIRESTORE_BASE}/staff/\${docId}?key=\${FIRESTORE_API_KEY}\`, { method: "DELETE" });
  } catch (e) {
    console.warn("Failed to delete staff from Firestore:", e);
  }
}
`;

if (!fsCode.includes('syncStaffToFirestore')) {
  fsCode += '\n' + staffSyncCode;
  fs.writeFileSync(fsPath, fsCode, 'utf8');
  console.log("Added syncStaffToFirestore to firestoreSync.ts");
}

// 2. Update browserDb.ts to import syncStaffToFirestore and call it on staff save
const dbPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/browserDb.ts';
let dbCode = fs.readFileSync(dbPath, 'utf8');

if (!dbCode.includes('syncStaffToFirestore')) {
  dbCode = dbCode.replace(
    'import {\n  fetchFirestoreState,',
    'import {\n  syncStaffToFirestore,\n  fetchFirestoreState,'
  );
}

// Call syncStaffToFirestore in route === "staff"
dbCode = dbCode.replace(
  'saveLocalState(state);\n    return { ok: true, staff: state.staff };',
  `saveLocalState(state);
    if (body) syncStaffToFirestore(body).catch(() => {});
    return { ok: true, staff: state.staff };`
);

fs.writeFileSync(dbPath, dbCode, 'utf8');
console.log("Updated browserDb.ts to sync staff to Firebase on save");
