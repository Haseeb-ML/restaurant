import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const fixScriptPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/apply_complete_mobile_fix.mjs';
let content = fs.readFileSync(fixScriptPath, 'utf8');

// 1. Add extra legacy neutralization in the script
const legacyNeutralizeMarker = '// Line 201: nth-child forcing all buttons to display';
const newNeutralizeRules = `// Neutralize legacy peach/pink active button backgrounds
css = css.replace(
  /\\.app-shell \\.sidebar nav button\\.active\\{[^}]*\\}/g,
  '/* neutralized legacy pink active */'
);
css = css.replace(
  /html\\[lang[^\\]]*\\] \\.sidebar[^}]*button\\.active\\{[^}]*\\}/g,
  '/* neutralized legacy lang pink active */'
);
css = css.replace(
  /\\.sidebar nav button\\.active\\{background:#f5e8d5[^}]*\\}/g,
  '/* neutralized legacy f5e8d5 */'
);
css = css.replace(
  /\\.sidebar nav button\\.active\\{background:#f2e5cb[^}]*\\}/g,
  '/* neutralized legacy f2e5cb */'
);

// Desktop active state: Dark emerald with gold/orange indicator (No pink!)
css += \`
.app-shell .sidebar nav button.active {
  background: rgba(255, 255, 255, 0.15) !important;
  color: #ffffff !important;
  border-left: 3px solid #d56a2d !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}
[dir="rtl"] .app-shell .sidebar nav button.active {
  border-left: 0 !important;
  border-right: 3px solid #d56a2d !important;
}
.app-shell .sidebar nav button.active svg {
  color: #e5a970 !important;
}
\`;

${legacyNeutralizeMarker}`;

if (!content.includes('neutralized legacy pink active')) {
  content = content.replace(legacyNeutralizeMarker, newNeutralizeRules);
}

// 2. Replace Section 3 and Section 4 with Web-sidebar matching Dark Emerald theme
const sec3Marker = '/* 3. Slide-out Mobile Navigation Drawer';
const sec5Marker = '/* 5. POS Segment Switcher';

const sec3Idx = content.indexOf(sec3Marker);
const sec5Idx = content.indexOf(sec5Marker);

if (sec3Idx === -1 || sec5Idx === -1) {
  console.error("Could not find Section 3 or Section 5 markers: " + JSON.stringify({ sec3Idx, sec5Idx }));
  process.exit(1);
}

const newSections3and4 = `/* 3. Slide-out Mobile Navigation Drawer (MATCHES WEB DARK EMERALD THEME) */
  .mobile-drawer-overlay {
    display: flex !important;
    position: fixed !important;
    inset: 0 !important;
    background: rgba(0, 0, 0, 0.55) !important;
    backdrop-filter: blur(4px) !important;
    z-index: 9999 !important;
    animation: drawerFadeIn 0.2s ease !important;
    justify-content: flex-start !important;
  }
  html[dir="rtl"] .mobile-drawer-overlay {
    justify-content: flex-end !important;
  }
  .mobile-drawer-sheet {
    width: 82% !important;
    max-width: 320px !important;
    height: 100% !important;
    background: linear-gradient(175deg, #103f32 0%, #0c3328 100%) !important;
    display: flex !important;
    flex-direction: column !important;
    box-shadow: 4px 0 28px rgba(0, 0, 0, 0.35) !important;
    animation: drawerSlideInLeft 0.22s ease-out !important;
    overflow: hidden !important;
    color: #ffffff !important;
  }
  html[dir="rtl"] .mobile-drawer-sheet {
    animation: drawerSlideInRight 0.22s ease-out !important;
    box-shadow: -4px 0 28px rgba(0, 0, 0, 0.35) !important;
  }
  .mobile-drawer-header {
    padding: 16px 14px !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: #092820 !important;
  }
  .mobile-drawer-brand {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .mobile-drawer-brand .brand-mark {
    width: 38px !important;
    height: 38px !important;
    background: #d56a2d !important;
    color: #ffffff !important;
    font-size: 18px !important;
    font-weight: 700 !important;
    border-radius: 10px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
  }
  .mobile-drawer-brand-text strong {
    display: block !important;
    font-size: 15px !important;
    color: #ffffff !important;
    font-weight: 700 !important;
  }
  .mobile-drawer-brand-text small {
    display: block !important;
    font-size: 11px !important;
    color: #a4beae !important;
  }
  .mobile-drawer-close-btn {
    width: 36px !important;
    height: 36px !important;
    border: 0 !important;
    border-radius: 9px !important;
    background: rgba(255, 255, 255, 0.12) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: #ffffff !important;
    cursor: pointer !important;
    transition: background 0.15s ease !important;
  }
  .mobile-drawer-close-btn:active {
    background: rgba(255, 255, 255, 0.22) !important;
  }
  .mobile-drawer-nav {
    flex: 1 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 12px 10px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 4px !important;
  }
  .mobile-drawer-nav-item {
    width: 100% !important;
    min-height: 48px !important;
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 10px 14px !important;
    border-radius: 12px !important;
    border: 0 !important;
    background: transparent !important;
    color: #d1e2d7 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    text-align: start !important;
    transition: all 0.15s ease !important;
  }
  .mobile-drawer-nav-item:active {
    background: rgba(255, 255, 255, 0.08) !important;
  }
  .mobile-drawer-nav-item.active {
    background: #1c5644 !important;
    color: #ffffff !important;
    border-left: 3px solid #e5a970 !important;
    font-weight: 700 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
  }
  html[dir="rtl"] .mobile-drawer-nav-item.active {
    border-left: 0 !important;
    border-right: 3px solid #e5a970 !important;
  }
  .drawer-item-icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 24px !important;
    color: currentColor !important;
  }
  .mobile-drawer-nav-item.active .drawer-item-icon {
    color: #e5a970 !important;
  }
  .drawer-item-label {
    flex: 1 !important;
  }
  .drawer-item-arrow {
    font-size: 14px !important;
    color: #7a9486 !important;
  }
  .mobile-drawer-footer {
    padding: 14px !important;
    border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
    background: #092820 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
  }
  .mobile-drawer-user {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .drawer-user-avatar {
    width: 36px !important;
    height: 36px !important;
    border-radius: 9px !important;
    background: #1d5644 !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 13px !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
  }
  .drawer-user-info strong {
    display: block !important;
    font-size: 13.5px !important;
    color: #ffffff !important;
    font-weight: 700 !important;
  }
  .drawer-user-info small {
    display: block !important;
    font-size: 11px !important;
    color: #e5a970 !important;
    font-weight: 600 !important;
  }
  .mobile-drawer-logout-btn {
    width: 100% !important;
    min-height: 42px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    background: rgba(220, 53, 69, 0.15) !important;
    border: 1px solid rgba(220, 53, 69, 0.3) !important;
    border-radius: 10px !important;
    color: #ff8585 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    cursor: pointer !important;
    transition: background 0.15s ease !important;
  }
  .mobile-drawer-logout-btn:active {
    background: rgba(220, 53, 69, 0.25) !important;
  }

  /* 4. Bottom App Navigation Dock (MATCHES WEB DARK EMERALD THEME - ZERO PINK) */
  .sidebar, [dir="rtl"] .sidebar {
    position: fixed !important;
    inset: auto 0 0 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    height: 66px !important;
    min-height: 66px !important;
    max-height: 66px !important;
    padding: 2px 4px max(env(safe-area-inset-bottom, 0px), 4px) 4px !important;
    background: #103f32 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    box-shadow: 0 -4px 22px rgba(0, 0, 0, 0.32) !important;
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
    color: #a4beae !important;
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
    color: #a4beae !important;
  }
  /* Active tab state - STRICT ZERO PINK OVERRIDES */
  .app-shell .sidebar nav button.active,
  html[lang] .sidebar>nav button.active,
  html[lang] .app-shell>.sidebar nav button.active,
  [dir="rtl"] .sidebar nav button.active,
  .sidebar nav button.active {
    background: transparent !important;
    color: #ffffff !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }
  .sidebar nav button.active::before {
    content: '' !important;
    position: absolute !important;
    top: 0 !important;
    width: 26px !important;
    height: 3px !important;
    background: #e5a970 !important;
    border-radius: 0 0 3px 3px !important;
    box-shadow: 0 1px 6px rgba(229, 169, 112, 0.5) !important;
  }
  .app-shell .sidebar nav button.active .nav-icon-wrap,
  .sidebar nav button.active .nav-icon-wrap {
    background: #20614f !important;
    color: #ffffff !important;
    width: 46px !important;
    height: 28px !important;
    border-radius: 14px !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25) !important;
    transform: translateY(-1px) scale(1.05) !important;
  }
  .app-shell .sidebar nav button.active svg,
  .sidebar nav button.active svg {
    stroke: #ffffff !important;
    color: #ffffff !important;
    stroke-width: 2.3px !important;
  }
  .sidebar nav button.active i {
    display: none !important;
  }
  /* Primary Hero Pill for New Order (نیا آرڈر) */
  .sidebar nav button[aria-label="New Order"] .nav-icon-wrap {
    background: #d56a2d !important;
    color: #ffffff !important;
    border-radius: 14px !important;
    box-shadow: 0 3px 10px rgba(213, 106, 45, 0.4) !important;
  }
  .sidebar nav button[aria-label="New Order"] svg {
    stroke: #ffffff !important;
    color: #ffffff !important;
  }
  .sidebar nav button[aria-label="New Order"].active .nav-icon-wrap {
    background: linear-gradient(135deg, #e47535, #b84c14) !important;
    box-shadow: 0 4px 14px rgba(213, 106, 45, 0.55) !important;
    transform: translateY(-2px) scale(1.08) !important;
  }
  .sidebar nav button[aria-label="New Order"] span.nav-label,
  .sidebar nav button[aria-label="New Order"] > span:not(.nav-icon-wrap) {
    color: #fce8bb !important;
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
    color: #a4beae !important;
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
    color: #ffffff !important;
    font-weight: 700 !important;
  }
  .sidebar nav button:active {
    transform: scale(0.92) !important;
  }

  `;

content = content.substring(0, sec3Idx) + newSections3and4 + content.substring(sec5Idx);
fs.writeFileSync(fixScriptPath, content, 'utf8');
console.log("Successfully updated Section 3 & 4 in apply_complete_mobile_fix.mjs!");

// Run apply_complete_mobile_fix.mjs to recompile CSS
console.log("Recompiling CSS via apply_complete_mobile_fix.mjs...");
execSync('node apply_complete_mobile_fix.mjs', { stdio: 'inherit' });
console.log("Finished updating CSS!");
