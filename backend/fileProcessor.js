import fs from 'fs';
import xlsx from 'xlsx';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

// Parse a line of text into question format
function parseQuestionLine(line) {
  // Split by | or tab or multiple spaces
  const parts = line
    .split(/[|\t]/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (parts.length < 6) {
    return null;
  }

  return {
    question: parts[0],
    variant1: parts[1],
    variant2: parts[2],
    variant3: parts[3],
    variant4: parts[4],
    correctAnswer: parts[5],
  };
}

// Process TXT and CSV files
async function processTxtFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((line) => line.trim().length > 0);

  const questions = [];
  for (const line of lines) {
    // Skip header lines
    if (
      line.toLowerCase().includes('savol') ||
      line.toLowerCase().includes('variant') ||
      line.toLowerCase().includes('question')
    ) {
      continue;
    }

    const question = parseQuestionLine(line);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

// Process Excel files
async function processExcelFile(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const questions = [];
  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    // Skip empty rows or header rows
    if (
      !row ||
      row.length < 6 ||
      (typeof row[0] === 'string' &&
        (row[0].toLowerCase().includes('savol') ||
          row[0].toLowerCase().includes('question')))
    ) {
      continue;
    }

    // Check if row has enough data
    if (row.filter((cell) => cell !== undefined && cell !== '').length >= 6) {
      questions.push({
        question: String(row[0] || '').trim(),
        variant1: String(row[1] || '').trim(),
        variant2: String(row[2] || '').trim(),
        variant3: String(row[3] || '').trim(),
        variant4: String(row[4] || '').trim(),
        correctAnswer: String(row[5] || '').trim(),
      });
    }
  }

  return questions;
}

// Process Word documents
async function processWordFile(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  const text = result.value;
  const lines = text.split('\n').filter((line) => line.trim().length > 0);

  const questions = [];
  for (const line of lines) {
    // Skip header lines
    if (
      line.toLowerCase().includes('savol') ||
      line.toLowerCase().includes('variant') ||
      line.toLowerCase().includes('question')
    ) {
      continue;
    }

    const question = parseQuestionLine(line);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

// Process PDF files
async function processPdfFile(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  const text = data.text;
  const lines = text.split('\n').filter((line) => line.trim().length > 0);

  const questions = [];
  for (const line of lines) {
    // Skip header lines
    if (
      line.toLowerCase().includes('savol') ||
      line.toLowerCase().includes('variant') ||
      line.toLowerCase().includes('question')
    ) {
      continue;
    }

    const question = parseQuestionLine(line);
    if (question) {
      questions.push(question);
    }
  }

  return questions;
}

// Main function to process any supported file
export async function processFile(filePath, fileExtension) {
  try {
    let questions = [];

    switch (fileExtension) {
      case '.txt':
      case '.csv':
        questions = await processTxtFile(filePath);
        break;

      case '.xlsx':
      case '.xls':
        questions = await processExcelFile(filePath);
        break;

      case '.docx':
      case '.doc':
        questions = await processWordFile(filePath);
        break;

      case '.pdf':
        questions = await processPdfFile(filePath);
        break;

      default:
        throw new Error('Qo\'llab-quvvatlanmaydigan fayl formati');
    }

    // Validate questions
    const validQuestions = questions.filter((q) => {
      return (
        q.question &&
        q.variant1 &&
        q.variant2 &&
        q.variant3 &&
        q.variant4 &&
        q.correctAnswer &&
        q.question.length > 0 &&
        q.variant1.length > 0 &&
        q.variant2.length > 0 &&
        q.variant3.length > 0 &&
        q.variant4.length > 0 &&
        q.correctAnswer.length > 0
      );
    });

    return validQuestions;
  } catch (error) {
    console.error('File processing error:', error);
    throw error;
  }
}
