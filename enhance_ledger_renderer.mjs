import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/ledgerReportRenderer.ts';
let content = fs.readFileSync(filePath, 'utf8');

const printWindowReplacement = `  let opened = false;
  try {
    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();
      opened = true;
    }
  } catch (_) {}

  if (!opened && typeof document !== "undefined") {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.style.opacity = "0";
      document.body.appendChild(iframe);
      const doc = iframe.contentWindow?.document || iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(html);
        doc.close();
        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (_) {}
          setTimeout(() => {
            try { document.body.removeChild(iframe); } catch (_) {}
          }, 4000);
        }, 500);
      }
    } catch (_) {}
  }
  return { html };`;

const targetPrintPattern = /const w = window\.open\("", "_blank"\);[\s\S]*?w\.focus\(\);[\s\S]*?\}/g;

content = content.replace(targetPrintPattern, printWindowReplacement);

// In downloadLedgerCsv, return details
const downloadLedgerTarget = `  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}`;

const downloadLedgerReplacement = `  a.click();
  setTimeout(() => {
    try {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {}
  }, 1000);
  return { filename: \`General_Ledger_\${fromDate || "start"}_to_\${toDate || today}.csv\`, csvContent, rowCount: ledger.length };
}`;

if (content.includes(downloadLedgerTarget)) {
  content = content.replace(downloadLedgerTarget, downloadLedgerReplacement);
  console.log('downloadLedgerCsv updated!');
} else {
  console.error('Could not find downloadLedgerTarget');
}

// In downloadOwnerAccountCsv, return details
const downloadOwnerTarget = `  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
`;

const downloadOwnerReplacement = `  a.click();
  setTimeout(() => {
    try {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (_) {}
  }, 1000);
  return { filename: \`Owner_Account_\${fromDate || "start"}_to_\${toDate || today}.csv\`, csvContent, rowCount: ownerStats?.list?.length || 0 };
}
`;

if (content.includes(downloadOwnerTarget)) {
  content = content.replace(downloadOwnerTarget, downloadOwnerReplacement);
  console.log('downloadOwnerAccountCsv updated!');
} else {
  console.error('Could not find downloadOwnerTarget');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('ledgerReportRenderer.ts updated successfully!');
