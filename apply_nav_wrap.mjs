import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/Workspace.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace standard nav buttons
const target = 'children: urdu([(0, x.jsx)(S, { name: t }), (0, x.jsx)("span", { children: urdu(T[e] || e) }), i === e && (0, x.jsx)("i", {})])';
const replacement = 'children: urdu([(0, x.jsx)("span", { className: "nav-icon-wrap", children: (0, x.jsx)(S, { name: t }) }), (0, x.jsx)("span", { className: "nav-label", children: urdu(T[e] || e) }), i === e && (0, x.jsx)("i", {})])';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  console.log('Replaced standard nav buttons in Workspace.tsx');
} else {
  console.error('Target not found for standard nav buttons!');
}

const targetMore = 'children: [(0, x.jsx)(S, { name: "menu", size: 18 }), (0, x.jsx)("span", { children: urdu("مزید") })]';
const replacementMore = 'children: [(0, x.jsx)("span", { className: "nav-icon-wrap", children: (0, x.jsx)(S, { name: "menu", size: 18 }) }), (0, x.jsx)("span", { className: "nav-label", children: urdu("مزید") })]';

if (content.includes(targetMore)) {
  content = content.replace(targetMore, replacementMore);
  console.log('Replaced more button in Workspace.tsx');
} else {
  console.error('Target not found for more button!');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Workspace.tsx saved successfully.');
