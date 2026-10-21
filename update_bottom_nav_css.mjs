import fs from 'fs';
import { execSync } from 'child_process';

const fixScriptPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/apply_complete_mobile_fix.mjs';
let content = fs.readFileSync(fixScriptPath, 'utf8');

const sMarker = '/* 4. Bottom App Navigation Dock';
const eMarker = '/* 5. POS Segment Switcher';

const sIdx = content.indexOf(sMarker);
const eIdx = content.indexOf(eMarker);

if (sIdx === -1 || eIdx === -1) {
  console.error("Could not find markers: " + JSON.stringify({ sIdx, eIdx }));
  process.exit(1);
}

const newSec4 = `/* 4. Bottom App Navigation Dock (EXQUISITE PROFESSIONAL DOCK) */
  .sidebar, [dir="rtl"] .sidebar {
    position: fixed !important;
    inset: auto 0 0 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: 66px !important;
    min-height: 66px !important;
    max-height: 66px !important;
    padding: 2px 4px max(env(safe-area-inset-bottom, 0px), 4px) 4px !important;
    background: rgba(255, 255, 255, 0.96) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
    border-top: 1.2px solid rgba(16, 75, 59, 0.12) !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    box-shadow: 0 -4px 22px rgba(16, 75, 59, 0.08), 0 -1px 3px rgba(0, 0, 0, 0.02) !important;
    z-index: 70 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-around !important;
    box-sizing: border-box !important;
  }
  .sidebar > .brand, .side-footer {
    display: none !important;
  }
  .sidebar nav {
    margin: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-around !important;
    gap: 2px !important;
    padding: 0 2px !important;
    overflow: hidden !important;
    box-sizing: border-box !important;
  }
  /* Neutralize all buttons with high specificity */
  .sidebar nav button,
  .sidebar nav button:nth-child(n),
  [dir="rtl"] .sidebar nav button,
  [dir="rtl"] .sidebar nav button:nth-child(n) {
    display: none !important;
    flex: 1 1 0 !important;
    min-width: 0 !important;
    max-width: 20% !important;
    height: 100% !important;
    padding: 2px 1px !important;
    margin: 0 !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 12px !important;
    border: 0 !important;
    background: transparent !important;
    color: #5d7065 !important;
    cursor: pointer !important;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    box-sizing: border-box !important;
    position: relative !important;
    user-select: none !important;
    -webkit-user-select: none !important;
  }
  /* Show exactly the 5 professional primary tabs */
  .sidebar nav button[aria-label="Dashboard"],
  .sidebar nav button[aria-label="New Order"],
  .sidebar nav button[aria-label="Orders & Kitchen"],
  .sidebar nav button[aria-label="Tables"],
  .sidebar nav button.mobile-bottom-more-btn,
  [dir="rtl"] .sidebar nav button[aria-label="Dashboard"],
  [dir="rtl"] .sidebar nav button[aria-label="New Order"],
  [dir="rtl"] .sidebar nav button[aria-label="Orders & Kitchen"],
  [dir="rtl"] .sidebar nav button[aria-label="Tables"],
  [dir="rtl"] .sidebar nav button.mobile-bottom-more-btn {
    display: flex !important;
  }
  /* Disabled button is never shown in mobile dock */
  .sidebar nav button[disabled],
  [dir="rtl"] .sidebar nav button[disabled] {
    display: none !important;
  }
  /* Icon wrap pill */
  .sidebar nav button .nav-icon-wrap {
    width: 44px !important;
    height: 28px !important;
    min-height: 28px !important;
    max-height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 14px !important;
    transition: all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
    background: transparent !important;
    margin-bottom: 2px !important;
  }
  .sidebar nav button svg {
    width: 20px !important;
    height: 20px !important;
    stroke: currentColor !important;
    stroke-width: 2px !important;
    transition: all 0.2s ease !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
  }
  /* Active tab state */
  .sidebar nav button.active {
    background: transparent !important;
    color: #104737 !important;
  }
  .sidebar nav button.active::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    width: 26px !important;
    height: 3px !important;
    background: linear-gradient(90deg, #104737, #247a59) !important;
    border-radius: 0 0 3px 3px !important;
    box-shadow: 0 1px 4px rgba(16, 71, 55, 0.35) !important;
  }
  .sidebar nav button.active .nav-icon-wrap {
    background: #d8ece0 !important;
    color: #104737 !important;
    width: 46px !important;
    height: 28px !important;
    border-radius: 14px !important;
    box-shadow: 0 2px 6px rgba(16, 71, 55, 0.16) !important;
    transform: translateY(-1px) scale(1.05) !important;
  }
  .sidebar nav button.active svg {
    stroke: #104737 !important;
    stroke-width: 2.3px !important;
  }
  .sidebar nav button.active i {
    display: none !important;
  }
  /* Primary Hero Pill for New Order (نیا آرڈر) */
  .sidebar nav button[aria-label="New Order"] .nav-icon-wrap {
    background: #14533e !important;
    color: #ffffff !important;
    border-radius: 14px !important;
    box-shadow: 0 3px 8px rgba(20, 83, 62, 0.28) !important;
  }
  .sidebar nav button[aria-label="New Order"] svg {
    stroke: #ffffff !important;
    color: #ffffff !important;
  }
  .sidebar nav button[aria-label="New Order"].active .nav-icon-wrap {
    background: linear-gradient(135deg, #185e46, #0e3b2c) !important;
    box-shadow: 0 4px 12px rgba(20, 83, 62, 0.45) !important;
    transform: translateY(-2px) scale(1.08) !important;
  }
  .sidebar nav button[aria-label="New Order"] span.nav-label,
  .sidebar nav button[aria-label="New Order"] > span:not(.nav-icon-wrap) {
    color: #14533e !important;
    font-weight: 700 !important;
  }
  /* Labels typography */
  .sidebar nav button span.nav-label,
  .sidebar nav button > span:not(.nav-icon-wrap) {
    display: block !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    max-width: 96% !important;
    font-size: 10.5px !important;
    font-weight: 600 !important;
    line-height: 1.3 !important;
    letter-spacing: normal !important;
    transition: color 0.18s ease !important;
    margin-top: 1px !important;
  }
  [dir="rtl"] .sidebar nav button span.nav-label,
  [dir="rtl"] .sidebar nav button > span:not(.nav-icon-wrap) {
    font-family: 'Restaurant Nastaliq', serif !important;
    font-size: 11.5px !important;
    line-height: 1.35 !important;
    font-weight: 600 !important;
  }
  .sidebar nav button.active span.nav-label,
  .sidebar nav button.active > span:not(.nav-icon-wrap) {
    color: #104737 !important;
    font-weight: 700 !important;
  }
  .sidebar nav button:active {
    transform: scale(0.92) !important;
  }

  `;

content = content.substring(0, sIdx) + newSec4 + content.substring(eIdx);
fs.writeFileSync(fixScriptPath, content, 'utf8');
console.log("Successfully updated Section 4 in apply_complete_mobile_fix.mjs!");

// Run apply_complete_mobile_fix.mjs
console.log("Recompiling CSS via apply_complete_mobile_fix.mjs...");
execSync('node apply_complete_mobile_fix.mjs', { stdio: 'inherit' });
console.log("CSS successfully updated!");
