import fs from 'fs';
import path from 'path';

const fullSourcePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source';
const cssPath = path.join(fullSourcePath, 'src/index.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Cut from the marker if it exists
const marker = '/* Desktop defaults for mobile-only controls */';
const idx = css.indexOf(marker);
if (idx !== -1) {
  css = css.substring(0, idx);
}

// 2. Neutralize conflicting legacy rules
// Neutralize legacy peach/pink active button backgrounds
css = css.replace(
  /\.app-shell \.sidebar nav button\.active\{[^}]*\}/g,
  '/* neutralized legacy pink active */'
);
css = css.replace(
  /html\[lang[^\]]*\] \.sidebar[^}]*button\.active\{[^}]*\}/g,
  '/* neutralized legacy lang pink active */'
);
css = css.replace(
  /\.sidebar nav button\.active\{background:#f5e8d5[^}]*\}/g,
  '/* neutralized legacy f5e8d5 */'
);
css = css.replace(
  /\.sidebar nav button\.active\{background:#f2e5cb[^}]*\}/g,
  '/* neutralized legacy f2e5cb */'
);

// Desktop active state: Dark emerald with gold/orange indicator (No pink!)
css += `
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
`;

// Line 201: nth-child forcing all buttons to display
css = css.replace(
  /\.sidebar nav button:nth-child\(n\)\{[^}]+\}/g,
  '/* neutralized legacy nth-child button display */'
);

// Line 259: legacy 700px topbar wrap
css = css.replace(
  /@media\(max-width:700px\)\{\.topbar\{flex-wrap:wrap;[^}]+\}\.top-actions\{flex-wrap:wrap;[^}]+\}[^}]+\}/g,
  '/* neutralized legacy 700px topbar wrap */'
);

// Line 395: legacy 800px top-actions width:100%
css = css.replace(
  /\.topbar \.top-actions\{width:100%;justify-content:flex-start\}/g,
  '/* neutralized legacy top-actions width:100% */'
);

// Line 393: top-actions flex-wrap
css = css.replace(
  /\.top-actions\{flex-wrap:wrap\}/g,
  '.top-actions{flex-wrap:nowrap}'
);

const mobileEngineCss = `/* Desktop defaults for mobile-only controls */
.mobile-hamburger-btn {
  display: none;
}
.mobile-bottom-more-btn {
  display: none;
}
.mobile-drawer-overlay {
  display: none;
}
.mobile-pos-nav-switcher {
  display: none;
}
.mobile-service-header {
  display: none;
}
.mobile-order-back-bar {
  display: none;
}
.mobile-cart {
  display: none;
}

@keyframes drawerFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes drawerSlideInLeft {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}
@keyframes drawerSlideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

/* ============================================================
   NATIVE-GRADE MOBILE RESPONSIVE ENGINE (Screens <= 800px)
   ============================================================ */
@media (max-width: 800px) {
  /* 1. Global Viewport & Reset */
  html, body {
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
    -webkit-tap-highlight-color: transparent !important;
    font-size: 14px !important;
    background: #f8f6f0 !important;
  }
  #root {
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    min-height: 100dvh !important;
  }
  .app-shell {
    display: block !important;
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    min-height: 100dvh !important;
    background: #f8f6f0 !important;
    padding-bottom: 70px !important;
  }
  .main-shell {
    margin: 0 !important;
    padding: 0 !important;
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }

  /* 2. Topbar: 56px Compact Native Mobile Header (NEVER WRAPS) */
  .topbar {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    justify-content: space-between !important;
    height: 56px !important;
    min-height: 56px !important;
    max-height: 56px !important;
    padding: 0 12px !important;
    background: #ffffff !important;
    border-bottom: 1.5px solid #dce4dd !important;
    position: sticky !important;
    top: 0 !important;
    z-index: 60 !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
    gap: 8px !important;
  }
  .topbar-brand-left {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
  }
  .mobile-hamburger-btn {
    display: none !important;
  }
  .topbar-brand-left h1 {
    font-size: 18px !important;
    font-weight: 700 !important;
    letter-spacing: -0.2px !important;
    color: #103f32 !important;
    margin: 0 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    line-height: 1.2 !important;
  }
  .topbar-brand-left p {
    display: none !important;
  }
  .app-zoom, .role-pill, .connection {
    display: none !important;
  }
  /* Top Actions & Language Switcher completely hidden on mobile top header */
  .top-actions,
  .topbar .language-switch,
  .topbar .top-actions {
    display: none !important;
  }

  /* 3. Slide-out Mobile Navigation Drawer (MATCHES WEB DARK EMERALD THEME) */
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

  /* 5. POS Segment Switcher (Menu vs Order & Bill) */
  .mobile-pos-nav-switcher {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 6px !important;
    padding: 8px 12px !important;
    background: #ffffff !important;
    border-bottom: 1px solid #e5ebe6 !important;
    position: sticky !important;
    top: 56px !important;
    z-index: 55 !important;
  }
  .mobile-pos-nav-btn {
    height: 42px !important;
    border: 1.5px solid #dce4d9 !important;
    border-radius: 10px !important;
    background: #f4f8f5 !important;
    color: #3b5045 !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 6px !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }
  .mobile-pos-nav-btn.active {
    background: #103f32 !important;
    color: #ffffff !important;
    border-color: #103f32 !important;
    box-shadow: 0 2px 6px rgba(16, 63, 50, 0.25) !important;
  }
  .mobile-nav-count-badge {
    background: #d9534f !important;
    color: #ffffff !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    padding: 1px 7px !important;
    border-radius: 10px !important;
    line-height: 1.2 !important;
  }

  /* 6. POS Layout in Catalog View */
  .pos-layout.mobile-view-catalog {
    display: block !important;
    min-height: 100% !important;
  }
  .pos-layout.mobile-view-catalog .catalog {
    display: block !important;
    padding: 10px 10px 140px !important;
    overflow: visible !important;
  }
  .pos-layout.mobile-view-catalog .desktop-order {
    display: none !important;
  }
  .pos-layout.mobile-view-catalog .mobile-cart {
    display: flex !important;
  }

  /* 7. POS Layout in Order / Cart View (Full-Height Column with Pinned Footer) */
  .pos-layout.mobile-view-order {
    display: flex !important;
    flex-direction: column !important;
    height: calc(100dvh - 56px - 60px) !important;
    max-height: calc(100dvh - 56px - 60px) !important;
    min-height: 0 !important;
    overflow: hidden !important;
    background: #ffffff !important;
  }
  .pos-layout.mobile-view-order .mobile-pos-nav-switcher {
    flex: 0 0 auto !important;
  }
  .pos-layout.mobile-view-order .catalog {
    display: none !important;
  }
  .pos-layout.mobile-view-order .desktop-order {
    display: flex !important;
    flex-direction: column !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    overflow: hidden !important;
    background: #ffffff !important;
    border: 0 !important;
    box-shadow: none !important;
  }
  .pos-layout.mobile-view-order .order-panel {
    display: flex !important;
    flex-direction: column !important;
    flex: 1 1 auto !important;
    height: 100% !important;
    min-height: 0 !important;
    overflow: hidden !important;
    position: static !important;
  }
  .pos-layout.mobile-view-order .order-head {
    flex: 0 0 auto !important;
    min-height: 48px !important;
    padding: 8px 12px !important;
    background: #f7faf8 !important;
    border-bottom: 1px solid #dce5dd !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .pos-layout.mobile-view-order .order-head h2 {
    font-size: 16px !important;
    color: #103f32 !important;
    margin: 0 !important;
  }
  .pos-layout.mobile-view-order .order-body {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    padding: 10px 14px !important;
    background: #ffffff !important;
  }
  .pos-layout.mobile-view-order .order-items {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
  }
  .pos-layout.mobile-view-order .order-row {
    padding: 10px 0 !important;
    border-bottom: 1px solid #eef2ef !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
  }
  .pos-layout.mobile-view-order .order-footer {
    flex: 0 0 auto !important;
    position: static !important;
    background: #ffffff !important;
    border-top: 1.5px solid #dce4dd !important;
    box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.06) !important;
    padding: 10px 14px 14px !important;
    border-radius: 0 !important;
    z-index: 50 !important;
  }
  .pos-layout.mobile-view-order .mobile-cart {
    display: none !important;
    visibility: hidden !important;
  }

  /* 8. Floating Cart Bar (In Catalog View) */
  .mobile-cart {
    position: fixed !important;
    display: flex !important;
    left: 12px !important;
    right: 12px !important;
    bottom: 68px !important;
    height: 52px !important;
    background: #103f32 !important;
    color: #ffffff !important;
    border-radius: 14px !important;
    z-index: 65 !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 16px !important;
    box-shadow: 0 6px 20px rgba(16, 63, 50, 0.4) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    cursor: pointer !important;
  }
  .mobile-cart-info {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .mobile-cart-badge {
    background: rgba(255, 255, 255, 0.22) !important;
    padding: 3px 8px !important;
    border-radius: 8px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
  }
  .mobile-cart-count {
    font-size: 13px !important;
    font-weight: 700 !important;
  }
  .mobile-cart-action {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .mobile-cart-total {
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #fce8bb !important;
  }
  .mobile-cart-btn-label {
    background: #ffffff !important;
    color: #103f32 !important;
    padding: 5px 12px !important;
    border-radius: 9px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
  }

  /* 9. Service Pills in Catalog View */
  .mobile-service-header {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-bottom: 10px !important;
  }
  .mobile-service-pills {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 6px !important;
  }
  .mobile-service-btn {
    height: 38px !important;
    border: 1.5px solid #d4dfd7 !important;
    border-radius: 10px !important;
    background: #ffffff !important;
    color: #274034 !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    cursor: pointer !important;
    transition: all 0.15s ease !important;
  }
  .mobile-service-btn.active {
    background: #103f32 !important;
    color: #ffffff !important;
    border-color: #103f32 !important;
  }

  /* 10. Dishes Grid: Clean 2 Columns */
  .food-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
    margin-top: 10px !important;
  }
  .food-card {
    border-radius: 14px !important;
    background: #ffffff !important;
    border: 1px solid #dce4dd !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04) !important;
  }
  .food-photo {
    height: 110px !important;
    width: 100% !important;
    position: relative !important;
  }
  .food-photo img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
  }
  .food-info {
    padding: 8px 10px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 3px !important;
    flex: 1 !important;
    background: #ffffff !important;
    text-align: start !important;
  }
  .food-info h3 {
    font-size: 13px !important;
    font-weight: 700 !important;
    color: #103f32 !important;
    margin: 0 !important;
    line-height: 1.3 !important;
    min-height: 34px !important;
  }
  .food-info strong {
    font-size: 14px !important;
    color: #d56a2d !important;
    font-weight: 700 !important;
  }
  .food-info small {
    font-size: 11px !important;
    color: #164b3b !important;
    font-weight: 600 !important;
  }

  /* 11. Categories Filter Bar */
  .categories {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    gap: 6px !important;
    margin: 8px 0 !important;
    padding-bottom: 4px !important;
  }
  .categories::-webkit-scrollbar {
    display: none !important;
  }
  .categories button {
    white-space: nowrap !important;
    padding: 6px 12px !important;
    font-size: 12px !important;
    border-radius: 8px !important;
    flex-shrink: 0 !important;
  }

  /* 12. Search Inputs */
  .search {
    width: 100% !important;
    border-radius: 10px !important;
    border: 1.5px solid #d4dfd7 !important;
    background: #ffffff !important;
    display: flex !important;
    align-items: center !important;
    padding: 0 10px !important;
    min-height: 42px !important;
  }
  .search input {
    font-size: 13px !important;
    height: 38px !important;
    width: 100% !important;
    border: 0 !important;
  }

  /* 13. Dashboard Mobile Layout */
  .easy-home {
    padding: 10px 10px 90px !important;
  }
  .easy-home > .page-heading {
    padding: 16px 14px !important;
    border-radius: 14px !important;
    gap: 10px !important;
  }
  .easy-home > .page-heading h2 {
    font-size: 19px !important;
  }
  .easy-home > .page-heading p {
    font-size: 12px !important;
  }
  /* Kitchen Status: exactly 3 cards in ONE row */
  .easy-home .easy-kitchen-status,
  .easy-kitchen-status {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 8px !important;
    padding: 12px 10px !important;
    border-radius: 14px !important;
    background: #ffffff !important;
    border: 1px solid #dce5d6 !important;
  }
  .easy-home .easy-kitchen-status > strong,
  .easy-kitchen-status > strong {
    grid-column: 1 / -1 !important;
    width: 100% !important;
    font-size: 15px !important;
    font-weight: 700 !important;
    color: #103f32 !important;
    margin: 0 !important;
    text-align: start !important;
  }
  .easy-home .easy-kitchen-status > button,
  .easy-kitchen-status > button {
    flex: none !important;
    width: 100% !important;
    min-width: 0 !important;
    min-height: 64px !important;
    height: auto !important;
    padding: 8px 4px !important;
    border: 1.5px solid #d6e2d9 !important;
    border-radius: 10px !important;
    background: #fbfdfb !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    box-sizing: border-box !important;
    cursor: pointer !important;
  }
  .easy-home .easy-kitchen-status > button span,
  .easy-kitchen-status > button span {
    font-size: 11px !important;
    line-height: 1.2 !important;
    color: #4a5d52 !important;
    text-align: center !important;
    white-space: normal !important;
    overflow: hidden !important;
    max-width: 100% !important;
  }
  .easy-home .easy-kitchen-status > button bdi,
  .easy-kitchen-status > button bdi {
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #103f32 !important;
    line-height: 1 !important;
  }
  .easy-home .easy-kitchen-status > button:nth-of-type(1) {
    border-top: 3.5px solid #d4a76a !important;
  }
  .easy-home .easy-kitchen-status > button:nth-of-type(2) {
    border-top: 3.5px solid #4a90e2 !important;
  }
  .easy-home .easy-kitchen-status > button:nth-of-type(3) {
    border-top: 3.5px solid #27ae60 !important;
  }
  .easy-metrics {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
    margin: 10px 0 !important;
  }
  .easy-metrics > article, .easy-metrics > button {
    padding: 12px 10px !important;
    border-radius: 12px !important;
  }
  .easy-metrics strong {
    font-size: 18px !important;
  }
  .easy-metrics span {
    font-size: 11px !important;
  }

  /* 14. Kitchen Board & Subnav */
  .subnav {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    gap: 6px !important;
    margin: 0 -12px 10px !important;
    padding: 0 12px 4px !important;
  }
  .subnav::-webkit-scrollbar {
    display: none !important;
  }
  .subnav button {
    white-space: nowrap !important;
    padding: 8px 14px !important;
    font-size: 12px !important;
    border-radius: 9px !important;
    flex-shrink: 0 !important;
  }
  .kitchen-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
  }
  .kitchen-card {
    padding: 14px !important;
    border-radius: 14px !important;
  }
  .kitchen-card h3 {
    font-size: 18px !important;
  }
  .kitchen-card li {
    font-size: 13px !important;
  }

  /* 15. Tables Grid */
  .easy-tables {
    padding: 10px 10px 90px !important;
  }
  .easy-table-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
  }
  .easy-table-grid article {
    padding: 12px !important;
    border-radius: 12px !important;
  }

  /* 16. Customers, Stock, Finance Tables */
  .table-wrap {
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
    border-radius: 12px !important;
  }
  .business-table {
    min-width: 580px !important;
    font-size: 12px !important;
  }
  .business-table th, .business-table td {
    padding: 10px 8px !important;
  }

  /* 17. Modals & Dialogs */
  .modal-backdrop {
    padding: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(0, 0, 0, 0.5) !important;
    z-index: 9999 !important;
  }
  .work-modal, .customer-editor-dialog, .dish-editor-dialog, .stock-editor-dialog {
    width: 95vw !important;
    max-width: 440px !important;
    max-height: 90dvh !important;
    border-radius: 16px !important;
    padding: 16px !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .work-modal .field input,
  .work-modal .field select,
  .work-modal .field textarea {
    min-height: 46px !important;
    font-size: 15px !important;
    border-radius: 10px !important;
    padding: 8px 12px !important;
  }

  /* 18. Mobile Login Screen - Fully Centered, Edge-to-Edge Responsive, No Overflow */
  .login-page {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100dvh !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 12px 10px !important;
    background: #f7f9f6 !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
  .login-visual {
    display: none !important;
  }
  .login-form {
    width: 100% !important;
    max-width: 390px !important;
    min-height: auto !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0 !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }
  .login-form > div {
    width: 100% !important;
    max-width: min(390px, 94vw) !important;
    background: #ffffff !important;
    border: 1px solid #dce6d1 !important;
    border-radius: 20px !important;
    box-shadow: 0 10px 30px rgba(22, 75, 59, 0.08) !important;
    padding: 18px 14px !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
  .login-form-top {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 6px !important;
    margin-bottom: 14px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .login-form-top .brand {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
    overflow: hidden !important;
  }
  .login-form-top .brand-mark {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    font-size: 15px !important;
    border-radius: 8px !important;
    flex-shrink: 0 !important;
  }
  .login-form-top .brand > div {
    min-width: 0 !important;
    flex: 1 1 auto !important;
    overflow: hidden !important;
  }
  .login-form-top .brand strong {
    font-size: 13.5px !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: block !important;
  }
  .login-form-top .brand span {
    font-size: 9px !important;
    line-height: 1.1 !important;
    display: block !important;
    white-space: nowrap !important;
    color: #64756c !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .login-language {
    position: static !important;
    top: auto !important;
    right: auto !important;
    left: auto !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
  }
  .login-language .language-switch {
    display: inline-flex !important;
    align-items: center !important;
    border: 1.5px solid #d4e2c9 !important;
    border-radius: 9px !important;
    overflow: hidden !important;
    background: #f2f7ec !important;
    padding: 2px !important;
    gap: 2px !important;
    box-sizing: border-box !important;
    flex-shrink: 0 !important;
    width: auto !important;
    min-width: 0 !important;
  }
  .login-language .language-switch button {
    min-width: 0 !important;
    width: auto !important;
    min-height: 28px !important;
    height: 28px !important;
    padding: 2px 8px !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    border-radius: 7px !important;
    line-height: 1.2 !important;
    box-sizing: border-box !important;
    letter-spacing: normal !important;
    border: none !important;
    white-space: nowrap !important;
  }
  .login-language .language-switch button[lang="ur"] {
    font-family: 'Restaurant Nastaliq', serif !important;
    font-size: 12px !important;
    line-height: 1.3 !important;
    padding: 2px 6px !important;
  }
  .login-language .language-switch button[aria-pressed="true"] {
    background: #164b3b !important;
    color: #ffffff !important;
    box-shadow: 0 1px 4px rgba(22, 75, 59, 0.25) !important;
  }
  .login-language .language-switch button[aria-pressed="false"] {
    background: transparent !important;
    color: #164b3b !important;
  }
  .login-form h2 {
    font-size: 21px !important;
    font-weight: 700 !important;
    color: #103f32 !important;
    margin: 4px 0 6px !important;
  }
  .login-form p {
    font-size: 13px !important;
    color: #556b60 !important;
    line-height: 1.45 !important;
    margin-bottom: 14px !important;
  }
  .login-form .field {
    margin-bottom: 14px !important;
    width: 100% !important;
  }
  .login-form .field > span {
    font-size: 13.5px !important;
    font-weight: 600 !important;
    color: #245e42 !important;
    display: block !important;
    margin-bottom: 4px !important;
  }
  .login-form .field input {
    width: 100% !important;
    min-height: 46px !important;
    font-size: 15px !important;
    padding: 10px 14px !important;
    border: 1.5px solid #ccdcbf !important;
    border-radius: 12px !important;
    background: #fafcfa !important;
    box-sizing: border-box !important;
  }
  .login-form button.primary {
    width: 100% !important;
    min-height: 48px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    border-radius: 12px !important;
    background: linear-gradient(120deg, #1f6b4e, #124634) !important;
    color: white !important;
    margin-top: 8px !important;
    box-shadow: 0 4px 14px rgba(22, 75, 59, 0.25) !important;
    box-sizing: border-box !important;
  }
  .login-form .login-help {
    margin-top: 14px !important;
    padding: 10px 12px !important;
    background: #edf5ed !important;
    border-radius: 10px !important;
    font-size: 12px !important;
    color: #3b5f4c !important;
    text-align: center !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
}
`;

fs.writeFileSync(cssPath, css + '\n' + mobileEngineCss, 'utf8');
console.log('Successfully applied complete mobile engine to src/index.css!');
