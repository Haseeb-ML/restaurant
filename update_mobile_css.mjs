import fs from 'fs';

const fixScriptPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/apply_complete_mobile_fix.mjs';
let content = fs.readFileSync(fixScriptPath, 'utf8');

// Update footer padding
content = content.replace(
  /\.mobile-drawer-footer\s*\{[\s\S]*?gap:\s*10px\s*!important;\s*\}/,
  `.mobile-drawer-footer {
    padding: 14px 14px max(24px, env(safe-area-inset-bottom, 24px)) 14px !important;
    border-top: 1px solid #e2eae3 !important;
    background: #f8faf8 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
  }`
);

// Add Section 18 before the closing brace of media query
if (!content.includes('/* 18. Mobile Login Screen */')) {
  const loginCss = `
  /* 18. Mobile Login Screen */
  .login-page {
    display: flex !important;
    flex-direction: column !important;
    min-height: 100dvh !important;
    width: 100vw !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    background: #f7f9f6 !important;
  }
  .login-visual {
    display: none !important;
  }
  .login-form {
    width: 100% !important;
    max-width: 100vw !important;
    min-height: 100dvh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 24px 16px !important;
    box-sizing: border-box !important;
  }
  .login-form > div {
    width: 100% !important;
    max-width: 400px !important;
    background: #ffffff !important;
    border: 1px solid #dce6d1 !important;
    border-radius: 20px !important;
    box-shadow: 0 12px 36px rgba(22, 75, 59, 0.08) !important;
    padding: 24px 18px !important;
    box-sizing: border-box !important;
  }
  .login-form-top {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-bottom: 16px !important;
  }
  .login-form h2 {
    font-size: 22px !important;
    font-weight: 700 !important;
    color: #103f32 !important;
    margin: 4px 0 8px !important;
  }
  .login-form p {
    font-size: 13px !important;
    color: #556b60 !important;
  }
  .login-form .field {
    margin-bottom: 12px !important;
  }
  .login-form .field > span {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #245e42 !important;
    display: block !important;
    margin-bottom: 4px !important;
  }
  .login-form .field input {
    width: 100% !important;
    min-height: 46px !important;
    font-size: 16px !important;
    padding: 10px 12px !important;
    border: 1.5px solid #ccdcbf !important;
    border-radius: 10px !important;
    background: #fafcfa !important;
    box-sizing: border-box !important;
  }
  .login-form button.primary {
    width: 100% !important;
    min-height: 48px !important;
    font-size: 16px !important;
    font-weight: 700 !important;
    border-radius: 11px !important;
    background: linear-gradient(120deg, #1f6b4e, #124634) !important;
    color: white !important;
    margin-top: 8px !important;
    box-shadow: 0 4px 14px rgba(22, 75, 59, 0.25) !important;
  }
  .login-form .login-help {
    margin-top: 14px !important;
    padding: 10px 12px !important;
    background: #edf5ed !important;
    border-radius: 10px !important;
    font-size: 12px !important;
    color: #3b5f4c !important;
    text-align: center !important;
  }
`;
  content = content.replace(/(\n\}\s*;\s*\n\s*fs\.writeFileSync)/, loginCss + '$1');
  console.log('Added Section 18 to apply_complete_mobile_fix.mjs');
}

fs.writeFileSync(fixScriptPath, content, 'utf8');
console.log('Updated apply_complete_mobile_fix.mjs');
