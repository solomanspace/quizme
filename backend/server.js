import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { processFile } from './fileProcessor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'text/csv',
    ];

    if (allowedTypes.includes(file.mimetype) || 
        file.originalname.match(/\.(pdf|xlsx?|docx?|txt|csv)$/i)) {
      cb(null, true);
    } else {
      cb(new Error('Fayl formati qo\'llab-quvvatlanmaydi'));
    }
  },
});

// Create uploads directory if it doesn't exist
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'QuizMe API is running' });
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Fayl yuklanmadi' });
    }

    const filePath = req.file.path;
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    // Process the file based on its type
    const questions = await processFile(filePath, fileExtension);

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    if (questions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Faylda savollar topilmadi yoki format noto\'g\'ri',
      });
    }

    res.json({ success: true, questions });
  } catch (error) {
    console.error('File processing error:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Faylni qayta ishlashda xatolik yuz berdi',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server ishlamoqda: http://localhost:${PORT}`);
});
