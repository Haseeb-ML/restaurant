import fs from 'fs';
import path from 'path';

const p = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/index.css';
let c = fs.readFileSync(p, 'utf8');

const marker = 'Mobile Invoice Saved Modal';
const idx = c.indexOf(marker);
if (idx !== -1) {
  // Find preceding comment start
  const commentStart = c.lastIndexOf('/* ========================================================================== */', idx);
  if (commentStart !== -1) {
    c = c.slice(0, commentStart);
  } else {
    c = c.slice(0, idx - 3);
  }
}

const newRule = `/* ========================================================================== */
/* Action Grid Styles (WhatsApp Sharing Removed) */
/* ========================================================================== */
.premium-invoice .action-grid,
.action-grid {
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)) !important;
  gap: 10px !important;
  margin: 14px 0 !important;
  display: grid !important;
}
.premium-invoice .action-grid button,
.action-grid button {
  min-height: 54px !important;
  padding: 10px 12px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  text-align: center !important;
  gap: 6px !important;
  border-radius: 12px !important;
  background: #f4f8f2 !important;
  border: 1.5px solid #d2e3cd !important;
}
.premium-invoice .action-grid button:active,
.action-grid button:active {
  transform: scale(0.96) !important;
  background: #e6f0e3 !important;
}
.premium-invoice .action-grid button svg,
.action-grid button svg {
  width: 22px !important;
  height: 22px !important;
  color: #d56a2d !important;
}
.premium-invoice .action-grid button strong,
.action-grid button strong {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #164b3b !important;
  line-height: 1.25 !important;
}
`;

fs.writeFileSync(p, c.trimEnd() + '\n\n' + newRule, 'utf8');
console.log('Successfully updated index.css');
