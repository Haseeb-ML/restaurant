import fs from 'fs';

const filePath = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/FinanceAccounts.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add state for report and export modals
const stateTarget = 'const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);';
const stateAddition = `// Report Preview Modal (PDF / Printable View)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportModalData, setReportModalData] = useState<{
    title: string;
    subtitle: string;
    debitLabel: string;
    creditLabel: string;
    netLabel: string;
    totals: { debits: number; credits: number; net: number; count: number };
    rows: any[];
    printFn?: () => void;
    copyText: string;
  }>({
    title: "",
    subtitle: "",
    debitLabel: "",
    creditLabel: "",
    netLabel: "",
    totals: { debits: 0, credits: 0, net: 0, count: 0 },
    rows: [],
    copyText: "",
  });

  // Excel / CSV Export Modal
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalData, setExportModalData] = useState<{
    filename: string;
    rowCount: number;
    csvContent: string;
    downloadFn?: () => void;
  }>({
    filename: "",
    rowCount: 0,
    csvContent: "",
  });

  ${stateTarget}`;

if (content.includes(stateTarget)) {
  content = content.replace(stateTarget, stateAddition);
  console.log("Added modal states to FinanceAccounts.tsx");
} else {
  console.error("Could not find stateTarget");
  process.exit(1);
}

// 2. Replace handlePrintLedger and handleExportCsv
const oldHandlersTarget = `  // Print ledger function
  const handlePrintLedger = () => {
    const accOption =
      selectedAccountFilter === "all"
        ? (isUrdu ? "تمام کھاتے (All Accounts)" : "All Accounts")
        : (chartOfAccounts?.groups?.flatMap((g: any) => g.accounts)?.find((a: any) => a.code === selectedAccountFilter)?.name || selectedAccountFilter);

    printLedgerReport({
      restaurant: data?.settings || {},
      ledger: filteredLedger,
      totals: ledgerTotals,
      fromDate,
      toDate,
      selectedAccountName: accOption,
      searchQuery,
      isUrdu,
      formatDate,
      getAccountDisplayName,
      getParticularsDisplay,
      getMethodLabel,
    });
  };

  // Export to CSV / Excel
  const handleExportCsv = () => {
    const accOption =
      selectedAccountFilter === "all"
        ? (isUrdu ? "تمام کھاتے (All Accounts)" : "All Accounts")
        : (chartOfAccounts?.groups?.flatMap((g: any) => g.accounts)?.find((a: any) => a.code === selectedAccountFilter)?.name || selectedAccountFilter);

    downloadLedgerCsv({
      restaurant: data?.settings || {},
      ledger: filteredLedger,
      totals: ledgerTotals,
      fromDate,
      toDate,
      selectedAccountName: accOption,
      isUrdu,
      formatDate,
      getAccountDisplayName,
      getParticularsDisplay,
      getMethodLabel,
    });
  };`;

const newHandlers = `  // Print ledger function (with interactive modal & direct print)
  const handlePrintLedger = () => {
    const accOption =
      selectedAccountFilter === "all"
        ? (isUrdu ? "تمام کھاتے (All Accounts)" : "All Accounts")
        : (chartOfAccounts?.groups?.flatMap((g: any) => g.accounts)?.find((a: any) => a.code === selectedAccountFilter)?.name || selectedAccountFilter);

    const textLines = [
      data?.settings?.name || "Dastarkhwan",
      isUrdu ? "جنرل لیجر اسٹیٹمنٹ رپورٹ" : "General Ledger Statement Report",
      (isUrdu ? "مدت: " : "Period: ") + fromDate + " - " + toDate,
      (isUrdu ? "کھاتہ: " : "Account: ") + accOption,
      "------------------------------------------",
      (isUrdu ? "کل ڈیبٹ: " : "Total Debits: ") + formatPkr(ledgerTotals.debits),
      (isUrdu ? "کل کریڈٹ: " : "Total Credits: ") + formatPkr(ledgerTotals.credits),
      (isUrdu ? "خالص بیلنس: " : "Net Balance: ") + formatPkr(ledgerTotals.net),
      (isUrdu ? "کل اندراجات: " : "Total Count: ") + ledgerTotals.count,
      "==========================================",
      ...filteredLedger.map((e: any) =>
        formatDate(e.date) + " | " + (e.voucherNo || "-") + " | " + (e.debit ? "DR: " + formatPkr(e.debit) : "CR: " + formatPkr(e.credit)) + " | " + (e.particulars || "-")
      )
    ];

    setReportModalData({
      title: isUrdu ? "جنرل لیجر اسٹیٹمنٹ (PDF رپورٹ)" : "General Ledger Statement (PDF Report)",
      subtitle: (isUrdu ? "مدت: " : "Period: ") + fromDate + " تا " + toDate + " | " + (isUrdu ? "کھاتہ: " : "Account: ") + accOption,
      debitLabel: isUrdu ? "کل ڈیبٹ (خرچ / ادا)" : "Total Debits",
      creditLabel: isUrdu ? "کل کریڈٹ (آمدن / وصول)" : "Total Credits",
      netLabel: isUrdu ? "خالص بیلنس" : "Net Balance",
      totals: ledgerTotals,
      rows: filteredLedger.map((e: any) => ({
        date: formatDate(e.date),
        account: getAccountDisplayName(e.accountCode),
        particulars: getParticularsDisplay(e),
        debit: e.debit || 0,
        credit: e.credit || 0,
      })),
      printFn: () => {
        printLedgerReport({
          restaurant: data?.settings || {},
          ledger: filteredLedger,
          totals: ledgerTotals,
          fromDate,
          toDate,
          selectedAccountName: accOption,
          searchQuery,
          isUrdu,
          formatDate,
          getAccountDisplayName,
          getParticularsDisplay,
          getMethodLabel,
        });
      },
      copyText: textLines.join("\\n"),
    });

    setIsReportModalOpen(true);

    try {
      printLedgerReport({
        restaurant: data?.settings || {},
        ledger: filteredLedger,
        totals: ledgerTotals,
        fromDate,
        toDate,
        selectedAccountName: accOption,
        searchQuery,
        isUrdu,
        formatDate,
        getAccountDisplayName,
        getParticularsDisplay,
        getMethodLabel,
      });
    } catch (_) {}
  };

  // Export to CSV / Excel (with interactive modal & direct download)
  const handleExportCsv = () => {
    const accOption =
      selectedAccountFilter === "all"
        ? (isUrdu ? "تمام کھاتے (All Accounts)" : "All Accounts")
        : (chartOfAccounts?.groups?.flatMap((g: any) => g.accounts)?.find((a: any) => a.code === selectedAccountFilter)?.name || selectedAccountFilter);

    const res = downloadLedgerCsv({
      restaurant: data?.settings || {},
      ledger: filteredLedger,
      totals: ledgerTotals,
      fromDate,
      toDate,
      selectedAccountName: accOption,
      isUrdu,
      formatDate,
      getAccountDisplayName,
      getParticularsDisplay,
      getMethodLabel,
    });

    setExportModalData({
      filename: res?.filename || \`General_Ledger_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: filteredLedger.length,
      csvContent: res?.csvContent || "",
      downloadFn: () => {
        downloadLedgerCsv({
          restaurant: data?.settings || {},
          ledger: filteredLedger,
          totals: ledgerTotals,
          fromDate,
          toDate,
          selectedAccountName: accOption,
          isUrdu,
          formatDate,
          getAccountDisplayName,
          getParticularsDisplay,
          getMethodLabel,
        });
      },
    });

    setIsExportModalOpen(true);
  };`;

if (content.includes(oldHandlersTarget)) {
  content = content.replace(oldHandlersTarget, newHandlers);
  console.log("Replaced ledger print and export handlers");
} else {
  console.error("Could not find oldHandlersTarget");
  process.exit(1);
}

// 3. Replace handlePrintOwnerAccount and handleExportOwnerCsv
const oldOwnerHandlersTarget = `  // Print Owner Personal Account Passbook
  const handlePrintOwnerAccount = () => {
    printOwnerAccountReport({
      restaurant: data?.settings || {},
      ownerStats: {
        earnedProfit: ownerStats.periodNetProfit,
        totalDrawings: ownerStats.periodDrawings,
        totalDeposits: ownerStats.periodDeposits,
        netBalance: ownerStats.netAvailableProfit,
        list: ownerStats.filteredList,
      },
      accountTitle: ownerStats.selectedOwnerName,
      fromDate,
      toDate,
      isUrdu,
      formatDate,
    });
  };

  // Export Owner Personal Account CSV
  const handleExportOwnerCsv = () => {
    downloadOwnerAccountCsv({
      restaurant: data?.settings || {},
      ownerStats: {
        earnedProfit: ownerStats.periodNetProfit,
        totalDrawings: ownerStats.periodDrawings,
        totalDeposits: ownerStats.periodDeposits,
        netBalance: ownerStats.netAvailableProfit,
        list: ownerStats.filteredList,
      },
      accountTitle: ownerStats.selectedOwnerName,
      fromDate,
      toDate,
      isUrdu,
      formatDate,
    });
  };`;

const newOwnerHandlers = `  // Print Owner Personal Account Passbook (with modal & print)
  const handlePrintOwnerAccount = () => {
    const textLines = [
      data?.settings?.name || "Dastarkhwan",
      ownerStats.selectedOwnerName + " - " + (isUrdu ? "مالک کا ذاتی کھاتہ اسٹیٹمنٹ" : "Owner Personal Account"),
      (isUrdu ? "مدت: " : "Period: ") + fromDate + " - " + toDate,
      "------------------------------------------",
      (isUrdu ? "کل منافع حصہ: " : "Earned Profit Share: ") + formatPkr(ownerStats.periodNetProfit),
      (isUrdu ? "کل نکلوائی گئی رقم: " : "Total Drawings: ") + formatPkr(ownerStats.periodDrawings),
      (isUrdu ? "کل جمع شدہ رقم: " : "Total Deposits: ") + formatPkr(ownerStats.periodDeposits),
      (isUrdu ? "خالص دستیاب بیلنس: " : "Net Available: ") + formatPkr(ownerStats.netAvailableProfit),
      "==========================================",
      ...ownerStats.filteredList.map((e: any) =>
        formatDate(e.date) + " | " + (e.type === "drawing" ? (isUrdu ? "نکلوائی رقم" : "Drawing") : (isUrdu ? "جمع رقم" : "Deposit")) + " | " + formatPkr(e.amount) + " | " + (e.note || "-")
      )
    ];

    setReportModalData({
      title: ownerStats.selectedOwnerName + " - " + (isUrdu ? "ذاتی پاس بک رپورٹ" : "Personal Passbook Report"),
      subtitle: (isUrdu ? "مدت: " : "Period: ") + fromDate + " تا " + toDate,
      debitLabel: isUrdu ? "کل نکلوائی رقم (Drawings)" : "Total Drawings",
      creditLabel: isUrdu ? "کل جمع رقم (Deposits)" : "Total Deposits",
      netLabel: isUrdu ? "خالص منافع / بیلنس" : "Net Balance",
      totals: {
        debits: ownerStats.periodDrawings,
        credits: ownerStats.periodDeposits,
        net: ownerStats.netAvailableProfit,
        count: ownerStats.filteredList.length,
      },
      rows: ownerStats.filteredList.map((e: any) => ({
        date: formatDate(e.date),
        account: e.type === "drawing" ? (isUrdu ? "ذاتی خرچ / نکالنا" : "Owner Drawing") : (isUrdu ? "ذاتی سرمایہ / جمع" : "Owner Deposit"),
        particulars: (e.method || "Cash") + (e.note ? " - " + e.note : ""),
        debit: e.type === "drawing" ? e.amount : 0,
        credit: e.type === "deposit" ? e.amount : 0,
      })),
      printFn: () => {
        printOwnerAccountReport({
          restaurant: data?.settings || {},
          ownerStats: {
            earnedProfit: ownerStats.periodNetProfit,
            totalDrawings: ownerStats.periodDrawings,
            totalDeposits: ownerStats.periodDeposits,
            netBalance: ownerStats.netAvailableProfit,
            list: ownerStats.filteredList,
          },
          accountTitle: ownerStats.selectedOwnerName,
          fromDate,
          toDate,
          isUrdu,
          formatDate,
        });
      },
      copyText: textLines.join("\\n"),
    });

    setIsReportModalOpen(true);

    try {
      printOwnerAccountReport({
        restaurant: data?.settings || {},
        ownerStats: {
          earnedProfit: ownerStats.periodNetProfit,
          totalDrawings: ownerStats.periodDrawings,
          totalDeposits: ownerStats.periodDeposits,
          netBalance: ownerStats.netAvailableProfit,
          list: ownerStats.filteredList,
        },
        accountTitle: ownerStats.selectedOwnerName,
        fromDate,
        toDate,
        isUrdu,
        formatDate,
      });
    } catch (_) {}
  };

  // Export Owner Personal Account CSV (with modal & download)
  const handleExportOwnerCsv = () => {
    const res = downloadOwnerAccountCsv({
      restaurant: data?.settings || {},
      ownerStats: {
        earnedProfit: ownerStats.periodNetProfit,
        totalDrawings: ownerStats.periodDrawings,
        totalDeposits: ownerStats.periodDeposits,
        netBalance: ownerStats.netAvailableProfit,
        list: ownerStats.filteredList,
      },
      accountTitle: ownerStats.selectedOwnerName,
      fromDate,
      toDate,
      isUrdu,
      formatDate,
    });

    setExportModalData({
      filename: res?.filename || \`Owner_Account_\${fromDate}_to_\${toDate}.csv\`,
      rowCount: ownerStats.filteredList.length,
      csvContent: res?.csvContent || "",
      downloadFn: () => {
        downloadOwnerAccountCsv({
          restaurant: data?.settings || {},
          ownerStats: {
            earnedProfit: ownerStats.periodNetProfit,
            totalDrawings: ownerStats.periodDrawings,
            totalDeposits: ownerStats.periodDeposits,
            netBalance: ownerStats.netAvailableProfit,
            list: ownerStats.filteredList,
          },
          accountTitle: ownerStats.selectedOwnerName,
          fromDate,
          toDate,
          isUrdu,
          formatDate,
        });
      },
    });

    setIsExportModalOpen(true);
  };`;

if (content.includes(oldOwnerHandlersTarget)) {
  content = content.replace(oldOwnerHandlersTarget, newOwnerHandlers);
  console.log("Replaced owner account print and export handlers");
} else {
  console.error("Could not find oldOwnerHandlersTarget");
  process.exit(1);
}

// 4. Append the two modals right before the final `    </div>\n  );\n}`
const modalMarkup = `      {/* MODAL: REPORT & PDF STATEMENT PREVIEW */}
      {isReportModalOpen && (
        <div className="modal-backdrop">
          <section className="work-modal finance-report-modal" role="dialog" aria-modal="true" style={{ maxWidth: '640px', width: '95vw', maxHeight: '90dvh' }}>
            <header>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#103f32' }}>
                  {reportModalData.title}
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#556b60' }}>
                  {reportModalData.subtitle}
                </p>
              </div>
              <button type="button" onClick={() => setIsReportModalOpen(false)}>
                ✕
              </button>
            </header>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', margin: '14px 0' }}>
              <div style={{ background: '#fdf3f2', border: '1px solid #f8d7da', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <small style={{ color: '#ba2d20', fontSize: '11px', fontWeight: 600 }}>{reportModalData.debitLabel}</small>
                <strong style={{ display: 'block', fontSize: '15px', color: '#842029', marginTop: '2px' }}>{formatPkr(reportModalData.totals.debits)}</strong>
              </div>
              <div style={{ background: '#f0f9f4', border: '1px solid #c3e6cb', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <small style={{ color: '#164b3b', fontSize: '11px', fontWeight: 600 }}>{reportModalData.creditLabel}</small>
                <strong style={{ display: 'block', fontSize: '15px', color: '#155724', marginTop: '2px' }}>{formatPkr(reportModalData.totals.credits)}</strong>
              </div>
              <div style={{ background: '#edf4fb', border: '1px solid #b8daff', borderRadius: '10px', padding: '10px', textAlign: 'center' }}>
                <small style={{ color: '#004085', fontSize: '11px', fontWeight: 600 }}>{reportModalData.netLabel}</small>
                <strong style={{ display: 'block', fontSize: '15px', color: '#0c5460', marginTop: '2px' }}>{formatPkr(reportModalData.totals.net)}</strong>
              </div>
            </div>

            {/* Scrollable Statement Table */}
            <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #dce4dd', borderRadius: '10px', background: '#fafcfa' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: isUrdu ? 'right' : 'left' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#eef4f0', borderBottom: '1.5px solid #ccdcbf', color: '#164b3b' }}>
                  <tr>
                    <th style={{ padding: '8px 10px' }}>{isUrdu ? "تاریخ" : "Date"}</th>
                    <th style={{ padding: '8px 10px' }}>{isUrdu ? "کھاتہ" : "Account"}</th>
                    <th style={{ padding: '8px 10px' }}>{isUrdu ? "تفصیل" : "Particulars"}</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>{isUrdu ? "ڈیبٹ" : "Debit"}</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>{isUrdu ? "کریڈٹ" : "Credit"}</th>
                  </tr>
                </thead>
                <tbody>
                  {reportModalData.rows.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64756c' }}>
                        {isUrdu ? "اس مدت میں کوئی ریکارڈ موجود نہیں۔" : "No records found for this period."}
                      </td>
                    </tr>
                  ) : (
                    reportModalData.rows.map((row: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #edf2ed', background: idx % 2 === 0 ? '#ffffff' : '#f9fbf9' }}>
                        <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>{row.date}</td>
                        <td style={{ padding: '8px 10px' }}>{row.account}</td>
                        <td style={{ padding: '8px 10px' }}>{row.particulars}</td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: row.debit > 0 ? '#ba2d20' : '#888', fontWeight: row.debit > 0 ? 600 : 400 }}>
                          {row.debit > 0 ? formatPkr(row.debit) : "-"}
                        </td>
                        <td style={{ padding: '8px 10px', textAlign: 'right', color: row.credit > 0 ? '#164b3b' : '#888', fontWeight: row.credit > 0 ? 600 : 400 }}>
                          {row.credit > 0 ? formatPkr(row.credit) : "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
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
            </div>
            <BottomClose onClose={() => setIsReportModalOpen(false)} />
          </section>
        </div>
      )}

      {/* MODAL: EXCEL & CSV EXPORT */}
      {isExportModalOpen && (
        <div className="modal-backdrop">
          <section className="work-modal finance-export-modal" role="dialog" aria-modal="true" style={{ maxWidth: '480px', width: '95vw' }}>
            <header>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#103f32' }}>
                  📊 {isUrdu ? "ایکسل شیٹ ایکسپورٹ" : "Excel Sheet Export"}
                </h2>
                <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#556b60' }}>
                  {exportModalData.filename}
                </p>
              </div>
              <button type="button" onClick={() => setIsExportModalOpen(false)}>
                ✕
              </button>
            </header>

            <div style={{ margin: '14px 0', padding: '14px', background: '#f4f8f5', borderRadius: '12px', border: '1px solid #dce8df' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>📑</span>
                <div>
                  <strong style={{ display: 'block', fontSize: '14px', color: '#164b3b' }}>
                    {exportModalData.rowCount} {isUrdu ? "اندراجات تیار ہیں" : "Records ready"}
                  </strong>
                  <small style={{ color: '#556b60', fontSize: '11px' }}>
                    {isUrdu ? "مائیکروسافٹ ایکسل، گوگل شیٹس اور تمام سافٹ ویئر سپورٹڈ" : "Compatible with Microsoft Excel & Google Sheets"}
                  </small>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            </div>

            <div style={{ marginTop: '14px', textAlign: 'center' }}>
              <button
                type="button"
                style={{ background: 'transparent', border: 0, color: '#64756c', fontSize: '13px', cursor: 'pointer', padding: '6px 12px' }}
                onClick={() => setIsExportModalOpen(false)}
              >
                {isUrdu ? "بند کریں" : "Close"}
              </button>
            </div>
            <BottomClose onClose={() => setIsExportModalOpen(false)} />
          </section>
        </div>
      )}
    </div>
  );
}`;

const finalTarget = `    </div>
  );
}`;

const finalIdx = content.lastIndexOf(finalTarget);
if (finalIdx !== -1) {
  content = content.substring(0, finalIdx) + modalMarkup;
  console.log("Appended report and export modals to FinanceAccounts.tsx");
} else {
  console.error("Could not find finalTarget");
  process.exit(1);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("FinanceAccounts.tsx updated successfully!");
