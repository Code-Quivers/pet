import puppeteer from 'puppeteer';

// Function to generate the PDF from HTML
export const generateInvoicePdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1024 }); // Ensure proper rendering

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Generate PDF with proper options
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true, // Ensure backgrounds are rendered
    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
  });

  await browser.close();
  return Buffer.from(pdfBuffer); // Return the PDF buffer
};
