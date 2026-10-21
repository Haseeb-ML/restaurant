import fs from 'fs';

const wsPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/Workspace.tsx';
let ws = fs.readFileSync(wsPath, 'utf8');

// 1. Update isCloudHosted condition to include localhost and 127.0.0.1
const cloudHostRegex = /const isCloudHosted = typeof window !== "undefined" && \([\s\S]*?\);/;
const cloudHostReplacement = `const isCloudHosted = typeof window !== "undefined" && (
        window.location.hostname.endsWith(".web.app") ||
        window.location.hostname.endsWith(".firebaseapp.com") ||
        window.location.hostname.endsWith(".github.io") ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.protocol === "file:" ||
        !window.location.hostname
    );`;

if (cloudHostRegex.test(ws)) {
  ws = ws.replace(cloudHostRegex, cloudHostReplacement);
  console.log("Updated isCloudHosted fast-path!");
} else {
  console.log("cloudHostRegex did not match");
}

// 2. Ensure both auth/logout blocks set logged_out in localStorage
ws = ws.replace(
  /if \(e === `auth\/logout`\) \{\s*k = null;\s*localStorage\.removeItem\("erp_token"\);\s*\}/g,
  `if (e === \`auth/logout\`) {
            k = null;
            try {
                localStorage.removeItem("erp_token");
                localStorage.setItem("dastarkhwan_current_user", "logged_out");
            } catch {}
        }`
);

// 3. Update the MobileMenuDrawer logout button JSX
// Search for className: "mobile-drawer-logout-btn"
const logoutBtnRegex = /\(0,\s*x\.jsxs\)\("button",\s*\{\s*type:\s*"button",\s*className:\s*"mobile-drawer-logout-btn"[\s\S]*?\}\)/;
const logoutBtnReplacement = `(0, x.jsxs)("button", {
                            type: "button",
                            className: "mobile-drawer-logout-btn",
                            onClick: onLogout,
                            children: [(0, x.jsx)(S, { name: "lock", size: 20 }), (0, x.jsx)("span", { children: urdu("Sign out") })]
                        })`;

if (logoutBtnRegex.test(ws)) {
  ws = ws.replace(logoutBtnRegex, logoutBtnReplacement);
  console.log("Updated mobile-drawer-logout-btn JSX!");
} else {
  console.log("logoutBtnRegex did not match");
}

// 4. Update the onLogout prop passed to MobileMenuDrawer
const onLogoutPropRegex = /onLogout:\s*async\s*\(\)\s*=>\s*\{\s*await j\("auth\/logout",\s*\{\}\);\s*t\(null\);\s*s\(null\);\s*setDrawerOpen\(!1\);\s*\}/;
const onLogoutPropReplacement = `onLogout: async () => {
                        try {
                            await j("auth/logout", {});
                        } catch {}
                        try {
                            localStorage.setItem("dastarkhwan_current_user", "logged_out");
                            localStorage.removeItem("erp_token");
                        } catch {}
                        t(null);
                        s(null);
                        setDrawerOpen(false);
                    }`;

if (onLogoutPropRegex.test(ws)) {
  ws = ws.replace(onLogoutPropRegex, onLogoutPropReplacement);
  console.log("Updated onLogout prop!");
} else {
  console.log("onLogoutPropRegex did not match");
}

fs.writeFileSync(wsPath, ws, 'utf8');
console.log("Saved Workspace.tsx");
