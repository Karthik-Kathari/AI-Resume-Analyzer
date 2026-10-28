import pdfParse from 'pdf-parse';

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const data = await pdfParse(buffer);
    return data.text.trim();
  } catch {
    throw new Error('Failed to parse PDF. Please ensure the file is a valid PDF.');
  }
};
