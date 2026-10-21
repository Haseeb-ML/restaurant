import fs from 'fs';

const file = 'C:/Users/M HASEEB/Desktop/Dastarkhwan-Full-Source/src/invoiceRenderer.ts';
let c = fs.readFileSync(file, 'utf8');
const nl = c.includes('\r\n') ? '\r\n' : '\n';
c = c.replace(/\r\n/g, '\n');

function rep(a, b) {
  if (!c.includes(a)) { console.error('NOT FOUND:\n' + a.slice(0, 120)); process.exit(1); }
  c = c.replace(a, b);
}

// 1. printInvoice -> Flutter aware
rep(`export function printInvoice(order: any, size: string = "A4", kitchen: boolean = false, lang?: string) {
  const currentLang = lang || (typeof window !== "undefined" ? getLanguage() : "ur");
`, `const flutterBridge = (): any => (typeof window !== "undefined" ? (window as any).FlutterApp : null);

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function sendPdfToFlutter(blob: Blob, fileName: string, text = "") {
  const bridge = flutterBridge();
  if (!bridge || typeof bridge.postMessage !== "function") return false;
  const base64 = await blobToBase64(blob);
  bridge.postMessage(JSON.stringify({ action: "pdf", fileName, base64, text }));
  return true;
}

// Android WebView has no navigator.share(files) support: route it through the Flutter app.
if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  const w = window as any;
  if (w.FlutterApp && typeof w.FlutterApp.postMessage === "function" && !(navigator as any).__flutterShareShim) {
    (navigator as any).__flutterShareShim = true;
    (navigator as any).canShare = () => true;
    (navigator as any).share = async (data: any) => {
      const files: File[] = data?.files || [];
      if (files.length) {
        await sendPdfToFlutter(files[0], files[0].name, data?.text || "");
      } else {
        w.FlutterApp.postMessage(JSON.stringify({ action: "share", text: [data?.title, data?.text, data?.url].filter(Boolean).join("\\n") }));
      }
    };
  }
}

export function printInvoice(order: any, size: string = "A4", kitchen: boolean = false, lang?: string) {
  const currentLang = lang || (typeof window !== "undefined" ? getLanguage() : "ur");
  if (flutterBridge()) {
    // window.open()/window.print() do not work inside the Flutter WebView; build a PDF and hand it to the app.
    downloadInvoicePdf(order, size, currentLang, kitchen).catch((err) => console.error("Flutter print error:", err));
    return;
  }
`);

// 2. downloadInvoicePdf signature + kitchen html
rep(`export async function downloadInvoicePdf(order: any, size: string = "A4", lang?: string): Promise<File | null> {`,
    `export async function downloadInvoicePdf(order: any, size: string = "A4", lang?: string, kitchen: boolean = false): Promise<File | null> {`);
rep(`const html = generateInvoiceHtml(order, size, false, true, currentLang); // true = noAutoPrint, no toolbar`,
    `const html = generateInvoiceHtml(order, size, kitchen, true, currentLang); // true = noAutoPrint, no toolbar`);
rep(`const fileName = \`\${order.number || "Invoice"}-Revision-\${order.revision || 1}.pdf\`;`,
    `const fileName = \`\${order.number || "Invoice"}-\${kitchen ? "Kitchen-Ticket" : \`Revision-\${order.revision || 1}\`}.pdf\`;`);

// 3. download: Flutter path instead of anchor click
rep(`          // Directly trigger browser download without print dialog
          const downloadUrl = URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();

          setTimeout(() => {
            if (link.parentNode) document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
          }, 300);
`, `          if (!(await sendPdfToFlutter(pdfBlob, fileName))) {
            // Directly trigger browser download without print dialog
            const downloadUrl = URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
              if (link.parentNode) document.body.removeChild(link);
              URL.revokeObjectURL(downloadUrl);
            }, 300);
          }
`);

// printInvoice is defined before downloadInvoicePdf - function hoisting is fine.
fs.writeFileSync(file, c.replace(/\n/g, nl), 'utf8');
console.log('invoiceRenderer.ts patched');

// Workspace: kitchen ticket button should use the same path (already printInvoice(..., true)) -> nothing to do.
