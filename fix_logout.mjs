import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/browserDb.ts';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /export function getCurrentUser\(\)[\s\S]*?export function setCurrentUser\(user: any\)[\s\S]*?^\}/m;

const replacement = `export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw || raw === "logged_out") return null;
    return JSON.parse(raw);
  } catch {}
  return null;
}

export function setCurrentUser(user: any) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem("erp_token", "standalone_token_" + user.id);
  } else {
    localStorage.setItem(USER_KEY, "logged_out");
    localStorage.removeItem("erp_token");
  }
}`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully fixed getCurrentUser and setCurrentUser in browserDb.ts!");
} else {
  console.error("Regex did not match in browserDb.ts!");
}
