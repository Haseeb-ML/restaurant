import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/FinanceAccounts.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update exportModalData type to include shareText
const oldExportState = `  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalData, setExportModalData] = useState<{
    filename: string;
    rowCount: number;
    csvContent: string;
    downloadFn?: () => void;
  }>({
    filename: "",
    rowCount: 0,
    csvContent: "",
  });`;

const newExportState = `  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalData, setExportModalData] = useState<{
    filename: string;
    rowCount: number;
    csvContent: string;
    shareText: string;
    downloadFn?: () => void;
  }>({
    filename: "",
    rowCount: 0,
    csvContent: "",
    shareText: "",
  });

  const shareToWhatsApp = (text: string) => {
    try {
      if ((window as any).FlutterApp) {
        (window as any).FlutterApp.postMessage(JSON.stringify({ action: "whatsapp", text }));
        return;
      }
      const waUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent(text);
      window.open(waUrl, "_blank");
    } catch (_) {
      window.open("https://api.whatsapp.com/send?text=" + encodeURIComponent(text), "_blank");
    }
  };

  const shareNativeOrWhatsApp = (title: string, text: string) => {
    try {
      if ((window as any).FlutterApp) {
        (window as any).FlutterApp.postMessage(JSON.stringify({ action: "share", text }));
        return;
      }
      if (navigator.share) {
        navigator.share({ title, text }).catch(() => {
          shareToWhatsApp(text);
        });
        return;
      }
      shareToWhatsApp(text);
    } catch (_) {
      shareToWhatsApp(text);
    }
  };`;

if (content.includes(oldExportState)) {
  content = content.replace(oldExportState, newExportState);
  console.log("Updated exportModalData state and added sharing helper functions");
} else {
  console.error("Could not find oldExportState");
  process.exit(1);
}

// 2. In handleExportCsv, set shareText
const oldExportCsvTarget = `    setExportModalData({
      filename: res?.filename || \`General_Ledger_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: filteredLedger.length,
      csvContent: res?.csvContent || "",
      downloadFn: () => {`;

const newExportCsvTarget = `    const waTextLines = [
      "📊 " + (data?.settings?.name || "Dastarkhwan") + " - " + (isUrdu ? "جنرل لیجر ایکسل رپورٹ" : "General Ledger Report"),
      (isUrdu ? "مدت: " : "Period: ") + fromDate + " تا " + toDate,
      (isUrdu ? "کھاتہ: " : "Account: ") + accOption,
      "------------------------------------------",
      (isUrdu ? "کل ڈیبٹ: " : "Total Debits: ") + formatPkr(ledgerTotals.debits),
      (isUrdu ? "کل کریڈٹ: " : "Total Credits: ") + formatPkr(ledgerTotals.credits),
      (isUrdu ? "خالص بیلنس: " : "Net Balance: ") + formatPkr(ledgerTotals.net),
      (isUrdu ? "کل اندراجات: " : "Total Records: ") + filteredLedger.length,
      "==========================================",
      ...filteredLedger.slice(0, 30).map((e: any) =>
        formatDate(e.date) + " | " + (e.voucherNo || "-") + " | " + (e.debit ? "DR " + formatPkr(e.debit) : "CR " + formatPkr(e.credit)) + " | " + (e.particulars || "-")
      )
    ];

    setExportModalData({
      filename: res?.filename || \`General_Ledger_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: filteredLedger.length,
      csvContent: res?.csvContent || "",
      shareText: waTextLines.join("\\n"),
      downloadFn: () => {`;

if (content.includes(oldExportCsvTarget)) {
  content = content.replace(oldExportCsvTarget, newExportCsvTarget);
  console.log("Updated handleExportCsv with shareText");
} else {
  console.error("Could not find oldExportCsvTarget");
  process.exit(1);
}

// 3. In handleExportOwnerCsv, set shareText
const oldOwnerExportTarget = `    setExportModalData({
      filename: res?.filename || \`Owner_Account_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: ownerStats.filteredList.length,
      csvContent: res?.csvContent || "",
      downloadFn: () => {`;

const newOwnerExportTarget = `    const waOwnerLines = [
      "📊 " + (data?.settings?.name || "Dastarkhwan") + " - " + ownerStats.selectedOwnerName,
      (isUrdu ? "مالک کا ذاتی کھاتہ ایکسل رپورٹ" : "Owner Personal Account Report"),
      (isUrdu ? "مدت: " : "Period: ") + fromDate + " تا " + toDate,
      "------------------------------------------",
      (isUrdu ? "کل منافع حصہ: " : "Earned Profit: ") + formatPkr(ownerStats.periodNetProfit),
      (isUrdu ? "کل نکلوائی رقم: " : "Total Drawings: ") + formatPkr(ownerStats.periodDrawings),
      (isUrdu ? "کل جمع رقم: " : "Total Deposits: ") + formatPkr(ownerStats.periodDeposits),
      (isUrdu ? "خالص دستیاب بیلنس: " : "Net Available: ") + formatPkr(ownerStats.netAvailableProfit),
      "==========================================",
      ...ownerStats.filteredList.slice(0, 30).map((e: any) =>
        formatDate(e.date) + " | " + (e.type === "drawing" ? (isUrdu ? "نکلوائی رقم" : "Drawing") : (isUrdu ? "جمع رقم" : "Deposit")) + " | " + formatPkr(e.amount) + " | " + (e.note || "-")
      )
    ];

    setExportModalData({
      filename: res?.filename || \`Owner_Account_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: ownerStats.filteredList.length,
      csvContent: res?.csvContent || "",
      shareText: waOwnerLines.join("\\n"),
      downloadFn: () => {`;

if (content.includes(oldOwnerExportTarget)) {
  content = content.replace(oldOwnerExportTarget, newOwnerExportTarget);
  console.log("Updated handleExportOwnerCsv with shareText");
} else {
  console.error("Could not find oldOwnerExportTarget");
  process.exit(1);
}

// 4. Update the Action Buttons in isReportModalOpen and isExportModalOpen
const oldReportButtonsTarget = `            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="finance-btn primary"
                style={{ flex: '1 1 140px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => {
                  if (reportModalData.printFn) {
                    reportModalData.printFn();
                  } else {
                    window.print();
                  }
                }}
              >
                🖨️ {isUrdu ? "پرنٹ / PDF پرنٹ کریں" : "Print / Save PDF"}
              </button>
              <button
                type="button"
                className="finance-btn secondary"
                style={{ flex: '1 1 120px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(reportModalData.copyText).then(() => {
                      notice && notice(isUrdu ? "رپورٹ کلپ بورڈ پر کاپی ہو گئی!" : "Report copied to clipboard!");
                    });
                  }
                }}
              >
                📋 {isUrdu ? "کاپی کریں" : "Copy Text"}
              </button>
              <button
                type="button"
                className="finance-btn secondary"
                style={{ minHeight: '44px' }}
                onClick={() => setIsReportModalOpen(false)}
              >
                {isUrdu ? "بند کریں" : "Close"}
              </button>
            </div>`;

const newReportButtons = `            {/* Action Buttons: 1. Share, 2. Print PDF, 3. Copy, 4. Close */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
              {/* Option 1: Share (WhatsApp & Native Share) */}
              <button
                type="button"
                className="finance-btn"
                style={{
                  flex: '1 1 130px',
                  minHeight: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#25D366',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '14px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(37, 211, 102, 0.35)',
                  border: 0,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  shareNativeOrWhatsApp(reportModalData.title, reportModalData.copyText);
                }}
              >
                📤 {isUrdu ? "شیئر کریں (Share)" : "Share Report"}
              </button>

              {/* Option 2: Print PDF */}
              <button
                type="button"
                className="finance-btn primary"
                style={{
                  flex: '1 1 140px',
                  minHeight: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  fontSize: '14px',
                  fontWeight: 700,
                  borderRadius: '10px',
                }}
                onClick={() => {
                  if (reportModalData.printFn) {
                    reportModalData.printFn();
                  } else {
                    window.print();
                  }
                }}
              >
                🖨️ {isUrdu ? "پرنٹ PDF محفوظ کریں" : "Print / Save PDF"}
              </button>

              {/* Copy Button */}
              <button
                type="button"
                className="finance-btn secondary"
                style={{ minHeight: '46px', padding: '0 14px', borderRadius: '10px' }}
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(reportModalData.copyText).then(() => {
                      notice && notice(isUrdu ? "رپورٹ کلپ بورڈ پر کاپی ہو گئی!" : "Report copied to clipboard!");
                    });
                  }
                }}
              >
                📋 {isUrdu ? "کاپی کریں" : "Copy"}
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="finance-btn secondary"
                style={{ minHeight: '46px', padding: '0 14px', borderRadius: '10px' }}
                onClick={() => setIsReportModalOpen(false)}
              >
                {isUrdu ? "بند کریں" : "Close"}
              </button>
            </div>`;

if (content.includes(oldReportButtonsTarget)) {
  content = content.replace(oldReportButtonsTarget, newReportButtons);
  console.log("Updated Report modal buttons with prominent Share & Print PDF options");
} else {
  console.error("Could not find oldReportButtonsTarget");
  process.exit(1);
}

// 5. Update Action Buttons in isExportModalOpen with prominent Share to WhatsApp
const oldExportButtonsTarget = `            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="finance-btn primary"
                style={{ minHeight: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '15px' }}
                onClick={() => {
                  if (exportModalData.downloadFn) {
                    exportModalData.downloadFn();
                  }
                  notice && notice(isUrdu ? "فائل ڈاؤن لوڈ ہو رہی ہے…" : "Downloading file…");
                }}
              >
                📥 {isUrdu ? "فائل ڈاؤن لوڈ کریں (.CSV / Excel)" : "Download File (.CSV / Excel)"}
              </button>

              <button
                type="button"
                className="finance-btn secondary"
                style={{ minHeight: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(exportModalData.csvContent).then(() => {
                      notice && notice(isUrdu ? "ایکسل ڈیٹا کلپ بورڈ پر کاپی ہو گیا! ایکسل یا گوگل شیٹس میں پیسٹ کریں" : "Excel data copied! Paste directly into Excel or Google Sheets");
                    });
                  }
                }}
              >
                📋 {isUrdu ? "ایکسل ڈیٹا کاپی کریں (Copy Data)" : "Copy Data for Excel / Sheets"}
              </button>
            </div>`;

const newExportButtons = `            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Option 1: Share to WhatsApp (Prominent WhatsApp Green button) */}
              <button
                type="button"
                className="finance-btn"
                style={{
                  minHeight: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  background: '#25D366',
                  color: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 3px 12px rgba(37, 211, 102, 0.38)',
                  border: 0,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  shareToWhatsApp(exportModalData.shareText || exportModalData.csvContent);
                  notice && notice(isUrdu ? "واٹس ایپ اوپن ہو رہا ہے…" : "Opening WhatsApp…");
                }}
              >
                💬 {isUrdu ? "واٹس ایپ پر شیئر کریں (Share to WhatsApp)" : "Share to WhatsApp"}
              </button>

              {/* Option 2: Download Excel CSV File */}
              <button
                type="button"
                className="finance-btn primary"
                style={{
                  minHeight: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  borderRadius: '10px',
                }}
                onClick={() => {
                  if (exportModalData.downloadFn) {
                    exportModalData.downloadFn();
                  }
                  notice && notice(isUrdu ? "فائل ڈاؤن لوڈ ہو رہی ہے…" : "Downloading file…");
                }}
              >
                📥 {isUrdu ? "ایکسل فائل ڈاؤن لوڈ کریں (.CSV)" : "Download Excel (.CSV)"}
              </button>

              {/* Option 3: Copy Data for Excel/Sheets */}
              <button
                type="button"
                className="finance-btn secondary"
                style={{
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '13.5px',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(exportModalData.csvContent).then(() => {
                      notice && notice(isUrdu ? "ایکسل ڈیٹا کلپ بورڈ پر کاپی ہو گیا! ایکسل یا گوگل شیٹس میں پیسٹ کریں" : "Excel data copied! Paste directly into Excel or Google Sheets");
                    });
                  }
                }}
              >
                📋 {isUrdu ? "ایکسل ڈیٹا کاپی کریں (Copy Data)" : "Copy Data for Excel / Sheets"}
              </button>
            </div>`;

if (content.includes(oldExportButtonsTarget)) {
  content = content.replace(oldExportButtonsTarget, newExportButtons);
  console.log("Updated Export modal with prominent Share to WhatsApp button");
} else {
  console.error("Could not find oldExportButtonsTarget");
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("FinanceAccounts.tsx updated successfully!");
