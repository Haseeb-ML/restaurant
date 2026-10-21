import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/Workspace.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const oldTarget = '["Dashboard", "Menu", "Stock & Purchases", "Finance & Accounts", "Daily Summary", "Settings"].includes(i)';
const newTarget = '["Menu", "Customers", "Stock & Purchases", "Finance & Accounts", "Daily Summary", "Settings"].includes(i)';

if (content.includes(oldTarget)) {
  content = content.replace(oldTarget, newTarget);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated mobile-bottom-more-btn active condition in Workspace.tsx!');
} else {
  console.error('Target not found in Workspace.tsx!');
  process.exit(1);
}
