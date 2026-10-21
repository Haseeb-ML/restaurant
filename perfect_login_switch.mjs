import fs from 'fs';

const fixScriptPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/apply_complete_mobile_fix.mjs';
let content = fs.readFileSync(fixScriptPath, 'utf8');

// Replace Section 18 with perfected responsive topbar and language switcher
const oldSec18Regex = /\/\* 18\. Mobile Login Screen[\s\S]*?\}\s*\}\s*;/;

const newSec18 = `/* 18. Mobile Login Screen - Fully Centered, Edge-to-Edge Responsive */
  .login-page {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100dvh !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 12px !important;
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
    padding: 20px 15px !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
  }
  .login-form-top {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 6px !important;
    margin-bottom: 16px !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  .login-form-top .brand {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
  }
  .login-form-top .brand-mark {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    font-size: 15px !important;
    border-radius: 8px !important;
    flex-shrink: 0 !important;
  }
  .login-form-top .brand strong {
    font-size: 14px !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: block !important;
  }
  .login-form-top .brand small {
    font-size: 10px !important;
    line-height: 1.1 !important;
    display: block !important;
    white-space: nowrap !important;
    color: #64756c !important;
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
    border: 1.5px solid #d4e2c9 !important;
    border-radius: 9px !important;
    overflow: hidden !important;
    background: #f2f7ec !important;
    padding: 2px !important;
    gap: 2px !important;
    box-sizing: border-box !important;
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
  }
  .login-language .language-switch button[lang="ur"] {
    font-family: 'Restaurant Nastaliq', serif !important;
    font-size: 12px !important;
    line-height: 1.4 !important;
    padding: 2px 6px !important;
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
    line-height: 1.5 !important;
    margin-bottom: 14px !important;
  }
  .login-form .field {
    margin-bottom: 14px !important;
    width: 100% !important;
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
    margin-top: 10px !important;
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
};`;

if (oldSec18Regex.test(content)) {
  content = content.replace(oldSec18Regex, newSec18);
  fs.writeFileSync(fixScriptPath, content, 'utf8');
  console.log("Successfully replaced Section 18 in apply_complete_mobile_fix.mjs");
} else {
  console.error("Could not match old Section 18 regex");
}
