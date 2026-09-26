import path from 'path';
import { fileURLToPath } from 'url';
import QRCode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = 'https://www.redrosephotobooth.com/';
const outPath = path.join(__dirname, '../client/public/qr-redrosephotobooth.png');

await QRCode.toFile(outPath, url, {
  width: 512,
  margin: 2,
  errorCorrectionLevel: 'M',
  color: { dark: '#21080C', light: '#FFF8ED' },
});

console.log(`QR code saved: ${outPath}`);
console.log(`Links to: ${url}`);
