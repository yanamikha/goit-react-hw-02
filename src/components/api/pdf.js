import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.resolve('./public/test.pdf');
  const fileBuffer = fs.readFileSync(filePath);

  return new Response(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="sample.pdf"'
    }
  });
}
