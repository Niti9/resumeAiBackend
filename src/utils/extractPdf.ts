
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";


import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

import { PDFParse } from 'pdf-parse';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  
// export const extractPdfText = async (buffer: Buffer): Promise<string> => {
export const extractPdfText = async () => {

  const pdfPath = path.join(__dirname, "./TestResume.pdf");

  const buffer = await readFile(pdfPath);

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

  console.log('data.text ----',result.text);
  return result.text;
};