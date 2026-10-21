import fs from 'fs';

// 1. Remove the floating pill from lib/main.dart
const mainDartPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/lib/main.dart';
let mainDart = fs.readFileSync(mainDartPath, 'utf8');

const pillRegex = /\s*\/\/\s*Floating Controls Bar[\s\S]*?Positioned\([\s\S]*?\}\),\s*\}\),\s*\}\),\s*\}\),\s*\}\),/;
if (pillRegex.test(mainDart)) {
  mainDart = mainDart.replace(pillRegex, '');
  console.log("Successfully removed floating pill from lib/main.dart using regex!");
} else {
  // Line based fallback
  const startMarker = '// Floating Controls Bar (Draggable, defaults right above bottom dock)';
  const endMarker = '              ),\n            ],\n          ),\n        ),\n      ),\n    );\n  }\n}';
  const startIdx = mainDart.indexOf(startMarker);
  const endIdx = mainDart.indexOf(endMarker);
  if (startIdx !== -1 && endIdx !== -1) {
    mainDart = mainDart.substring(0, startIdx) + mainDart.substring(endIdx);
    console.log("Successfully removed floating pill from lib/main.dart using markers!");
  } else {
    console.error("Could not find floating pill markers in lib/main.dart");
  }
}

fs.writeFileSync(mainDartPath, mainDart, 'utf8');

// 2. Update apply_complete_mobile_fix.mjs with the perfected Login Screen CSS
const fixScriptPath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/apply_complete_mobile_fix.mjs';
let fixScript = fs.readFileSync(fixScriptPath, 'utf8');

const perfectedLoginCss = `
  /* 18. Mobile Login Screen - Fully Centered, Edge-to-Edge Responsive */
  .login-page {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    min-height: 100dvh !important;
    width: 100vw !important;
    max-width: 100vw !important;
    margin: 0 !important;
    padding: 16px !important;
    background: #f7f9f6 !important;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
  }
  .login-visual {
    display: none !important;
  }
  .login-form {
    width: 100% !important;
    max-width: 380px !important;
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
    max-width: 380px !important;
    background: #ffffff !important;
    border: 1px solid #dce6d1 !important;
    border-radius: 20px !important;
    box-shadow: 0 10px 30px rgba(22, 75, 59, 0.08) !important;
    padding: 24px 18px !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
  }
  .login-form-top {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 8px !important;
    margin-bottom: 16px !important;
    width: 100% !important;
  }
  .login-form-top .brand {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .login-language {
    position: static !important;
    top: auto !important;
    right: auto !important;
    left: auto !important;
    flex-shrink: 0 !important;
  }
  .login-language .language-switch {
    display: flex !important;
    border: 1px solid #d4e2c9 !important;
    border-radius: 10px !important;
    overflow: hidden !important;
    background: #f2f7ec !important;
    padding: 2px !important;
  }
  .login-language .language-switch button {
    padding: 4px 10px !important;
    font-size: 13px !important;
    border-radius: 8px !important;
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
`;

// Insert before the last closing brace of the media query
const lastMediaBraceIdx = fixScript.lastIndexOf('}\n`;');
if (lastMediaBraceIdx !== -1) {
  fixScript = fixScript.substring(0, lastMediaBraceIdx) + perfectedLoginCss + fixScript.substring(lastMediaBraceIdx);
  fs.writeFileSync(fixScriptPath, fixScript, 'utf8');
  console.log("Successfully inserted perfected login CSS into apply_complete_mobile_fix.mjs");
} else {
  console.error("Could not find closing media brace in apply_complete_mobile_fix.mjs");
}
