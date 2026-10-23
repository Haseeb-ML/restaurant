import fs from 'fs';
import path from 'path';

const fullSourceDir = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source';
const workspacePath = path.join(fullSourceDir, 'src/Workspace.tsx');
let ws = fs.readFileSync(workspacePath, 'utf8');

// Target the action-grid with WhatsApp sharing button
const oldActionGrid = `(0, x.jsxs)("div", { className: \`action-grid\`, children: urdu([(0, x.jsxs)("button", { className: "desktop-only-btn action-btn-whatsapp", disabled: w !== (a.revision || latestRevision), onClick: () => c(\`share\`), children: urdu([(0, x.jsx)(S, { name: \`send\` }), (0, x.jsx)("strong", { children: urdu(\`WhatsApp sharing\`) })]) }), (0, x.jsxs)("button", { className: "desktop-only-btn action-btn-print", onClick: () => printInvoice(brandedInvoice, y, false), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsxs)("strong", { children: urdu([\`Print \`, y]) })]) }), (0, x.jsxs)("button", { className: "action-btn-download", disabled: te, onClick: k, children: urdu([(0, x.jsx)(S, { name: \`download\` }), (0, x.jsx)("strong", { children: urdu(te ? \`Preparing PDF…\` : \`Download / Share PDF\`) })]) }), (0, x.jsxs)("button", { className: "action-btn-kitchen", onClick: () => printInvoice(brandedInvoice, "80mm", true), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsx)("strong", { children: urdu(\`Print kitchen ticket\`) })]) })]) })`;

// New action-grid WITHOUT WhatsApp sharing
const newActionGrid = `(0, x.jsxs)("div", { className: \`action-grid\`, children: urdu([(0, x.jsxs)("button", { className: "action-btn-print", onClick: () => printInvoice(brandedInvoice, y, false), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsxs)("strong", { children: urdu([\`Print \`, y]) })]) }), (0, x.jsxs)("button", { className: "action-btn-download", disabled: te, onClick: k, children: urdu([(0, x.jsx)(S, { name: \`download\` }), (0, x.jsx)("strong", { children: urdu(te ? \`Preparing PDF…\` : \`Download / Share PDF\`) })]) }), (0, x.jsxs)("button", { className: "action-btn-kitchen", onClick: () => printInvoice(brandedInvoice, "80mm", true), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsx)("strong", { children: urdu(\`Print kitchen ticket\`) })]) })]) })`;

if (ws.includes(oldActionGrid)) {
  ws = ws.replace(oldActionGrid, newActionGrid);
  fs.writeFileSync(workspacePath, ws, 'utf8');
  console.log('Successfully removed WhatsApp sharing button from Workspace.tsx');
} else {
  console.error('Could not find oldActionGrid in Workspace.tsx');
  process.exit(1);
}
