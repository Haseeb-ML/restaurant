import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const fullSourceDir = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source';
const flutterAppDir = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App';

console.log('--- Step 1: Adding Urdu dictionary entry for Download / Share PDF ---');
const urduTsPath = path.join(fullSourceDir, 'src/Urdu.ts');
let urduTs = fs.readFileSync(urduTsPath, 'utf8');
if (!urduTs.includes('"Download / Share PDF"')) {
  urduTs = urduTs.replace(
    '"Download PDF": "بل محفوظ کریں",',
    '"Download PDF": "بل محفوظ کریں",\n  "Download / Share PDF": "بل ڈاؤن لوڈ / شیئر کریں",'
  );
  fs.writeFileSync(urduTsPath, urduTs, 'utf8');
  console.log('Added Download / Share PDF to Urdu.ts');
}

const urduJsonPath = path.join(fullSourceDir, 'src/urdu.json');
let urduJson = fs.readFileSync(urduJsonPath, 'utf8');
if (!urduJson.includes('"Download / Share PDF"')) {
  urduJson = urduJson.replace(
    '"Download PDF": "بل محفوظ کریں",',
    '"Download PDF": "بل محفوظ کریں",\n  "Download / Share PDF": "بل ڈاؤن لوڈ / شیئر کریں",'
  );
  fs.writeFileSync(urduJsonPath, urduJson, 'utf8');
  console.log('Added Download / Share PDF to urdu.json');
}

console.log('--- Step 2: Updating Workspace.tsx action-grid buttons ---');
const workspacePath = path.join(fullSourceDir, 'src/Workspace.tsx');
let ws = fs.readFileSync(workspacePath, 'utf8');

const targetActionGrid = `(0, x.jsxs)("div", { className: \`action-grid\`, children: urdu([(0, x.jsxs)("button", { disabled: w !== (a.revision || latestRevision), onClick: () => c(\`share\`), children: urdu([(0, x.jsx)(S, { name: \`send\` }), (0, x.jsx)("strong", { children: urdu(\`WhatsApp sharing\`) })]) }), (0, x.jsxs)("button", { onClick: () => printInvoice(brandedInvoice, y, false), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsxs)("strong", { children: urdu([\`Print \`, y]) })]) }), (0, x.jsxs)("button", { disabled: te, onClick: k, children: urdu([(0, x.jsx)(S, { name: \`download\` }), (0, x.jsx)("strong", { children: urdu(te ? \`Preparing PDF…\` : \`Download PDF\`) })]) }), (0, x.jsx)("button", { onClick: () => printInvoice(brandedInvoice, "80mm", true), children: urdu(\`Print kitchen ticket\`) })]) })`;

const replacementActionGrid = `(0, x.jsxs)("div", { className: \`action-grid\`, children: urdu([(0, x.jsxs)("button", { className: "desktop-only-btn action-btn-whatsapp", disabled: w !== (a.revision || latestRevision), onClick: () => c(\`share\`), children: urdu([(0, x.jsx)(S, { name: \`send\` }), (0, x.jsx)("strong", { children: urdu(\`WhatsApp sharing\`) })]) }), (0, x.jsxs)("button", { className: "desktop-only-btn action-btn-print", onClick: () => printInvoice(brandedInvoice, y, false), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsxs)("strong", { children: urdu([\`Print \`, y]) })]) }), (0, x.jsxs)("button", { className: "action-btn-download", disabled: te, onClick: k, children: urdu([(0, x.jsx)(S, { name: \`download\` }), (0, x.jsx)("strong", { children: urdu(te ? \`Preparing PDF…\` : \`Download / Share PDF\`) })]) }), (0, x.jsxs)("button", { className: "action-btn-kitchen", onClick: () => printInvoice(brandedInvoice, "80mm", true), children: urdu([(0, x.jsx)(S, { name: \`printer\` }), (0, x.jsx)("strong", { children: urdu(\`Print kitchen ticket\`) })]) })]) })`;

if (ws.includes(targetActionGrid)) {
  ws = ws.replace(targetActionGrid, replacementActionGrid);
  fs.writeFileSync(workspacePath, ws, 'utf8');
  console.log('Successfully updated action-grid buttons in Workspace.tsx');
} else {
  console.log('Looking for partial match in Workspace.tsx...');
  const idx = ws.indexOf('action-grid');
  if (idx !== -1) {
    console.log('Found action-grid snippet:\n', ws.slice(idx, idx + 200));
  }
}

console.log('--- Step 3: Enhancing downloadInvoicePdf with Web Share in invoiceRenderer.ts ---');
const invoiceRendererPath = path.join(fullSourceDir, 'src/invoiceRenderer.ts');
let ir = fs.readFileSync(invoiceRendererPath, 'utf8');

const targetPdfSend = `          if (!(await sendPdfToFlutter(pdfBlob, fileName))) {
            // Directly trigger browser download without print dialog
            const downloadUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
              if (link.parentNode) document.body.removeChild(link);
              URL.revokeObjectURL(downloadUrl);
            }, 300);
          }`;

const replacementPdfSend = `          if (!(await sendPdfToFlutter(pdfBlob, fileName))) {
            let shared = false;
            try {
              const fileObj = new File([pdfBlob], fileName, { type: "application/pdf" });
              if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [fileObj] })) {
                await navigator.share({
                  files: [fileObj],
                  title: fileName,
                  text: \`\${order?.number || "Invoice"} - \${order?.restaurant?.name || "Restaurant"}\`
                });
                shared = true;
              }
            } catch (_) {}

            if (!shared) {
              const downloadUrl = URL.createObjectURL(pdfBlob);
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.download = fileName;
              document.body.appendChild(link);
              link.click();

              setTimeout(() => {
                if (link.parentNode) document.body.removeChild(link);
                URL.revokeObjectURL(downloadUrl);
              }, 300);
            }
          }`;

if (ir.includes(targetPdfSend)) {
  ir = ir.replace(targetPdfSend, replacementPdfSend);
  fs.writeFileSync(invoiceRendererPath, ir, 'utf8');
  console.log('Successfully enhanced downloadInvoicePdf in invoiceRenderer.ts');
} else {
  console.log('targetPdfSend not found exactly in invoiceRenderer.ts');
}

console.log('--- Step 4: Adding CSS rules to hide desktop buttons and show only 2 buttons on mobile ---');
const mobileCssRule = `
/* ========================================================================== */
/* Mobile Invoice Saved Modal: Show ONLY 2 Buttons (Download/Share + Kitchen) */
/* ========================================================================== */
@media (max-width: 900px) {
  .action-grid .desktop-only-btn,
  .action-grid .action-btn-whatsapp,
  .action-grid .action-btn-print {
    display: none !important;
  }
  .premium-invoice .action-grid,
  .action-grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 10px !important;
    margin: 12px 0 !important;
  }
  .premium-invoice .action-grid button,
  .action-grid button {
    min-height: 54px !important;
    padding: 8px 10px !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    text-align: center !important;
    gap: 5px !important;
    border-radius: 12px !important;
    background: #f4f8f2 !important;
    border: 1.5px solid #d2e3cd !important;
  }
  .premium-invoice .action-grid button:active,
  .action-grid button:active {
    transform: scale(0.96) !important;
    background: #e6f0e3 !important;
  }
  .premium-invoice .action-grid button strong,
  .action-grid button strong {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #164b3b !important;
    line-height: 1.3 !important;
  }
  .premium-invoice .action-grid button svg,
  .action-grid button svg {
    width: 22px !important;
    height: 22px !important;
    color: #d56a2d !important;
  }
}
`;

const srcCssPath = path.join(fullSourceDir, 'src/index.css');
let srcCss = fs.readFileSync(srcCssPath, 'utf8');
if (!srcCss.includes('Mobile Invoice Saved Modal: Show ONLY 2 Buttons')) {
  srcCss += '\n' + mobileCssRule;
  fs.writeFileSync(srcCssPath, srcCss, 'utf8');
  console.log('Appended mobile invoice CSS to src/index.css');
}

console.log('Done script configuration!');
