import fs from 'fs';
import path from 'path';

const srcDir = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/dist';
const destDir = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Flutter-App/assets/dist';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Copying new dist files to Flutter assets/dist...');
// Clean older hashed assets in dest/assets to avoid buildup
const destAssetsDir = path.join(destDir, 'assets');
if (fs.existsSync(destAssetsDir)) {
  fs.rmSync(destAssetsDir, { recursive: true, force: true });
}

copyRecursiveSync(srcDir, destDir);

// Ensure index.html has the iOS PWA meta tags
const indexHtmlPath = path.join(destDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
if (!indexHtml.includes('apple-mobile-web-app-capable')) {
  indexHtml = indexHtml.replace(
    '<link rel="apple-touch-icon" href="/media/shah-brothers-logo.png" />',
    `<link rel="apple-touch-icon" href="/media/shah-brothers-logo.png" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Shah Brothers POS" />`
  );
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  console.log('Added iOS PWA meta tags to assets/dist/index.html');
}

console.log('Successfully synced dist to assets/dist!');
