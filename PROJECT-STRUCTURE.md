# QuizMe Project Structure

## 📁 Papkalar Tuzilmasi

```
quizme/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/         # React komponentlari
│   │   │   ├── FileUpload.jsx      # Fayl yuklash komponenti
│   │   │   ├── QuizSetup.jsx       # Test sozlash komponenti
│   │   │   ├── QuizTaking.jsx      # Test yechish komponenti
│   │   │   └── QuizResults.jsx     # Natijalar komponenti
│   │   ├── App.jsx             # Asosiy App komponenti
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── index.html              # HTML shablon
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite konfiguratsiyasi
│   ├── tailwind.config.js      # Tailwind konfiguratsiyasi
│   ├── postcss.config.js       # PostCSS konfiguratsiyasi
│   └── vercel.json             # Vercel deploy konfiguratsiyasi
│
├── backend/                     # Node.js backend
│   ├── server.js               # Express server
│   ├── fileProcessor.js        # Fayl qayta ishlash logikasi
│   ├── package.json            # Backend dependencies
│   └── uploads/                # Temporary fayl yuklash (avtomatik yaratiladi)
│
├── README.md                   # Asosiy dokumentatsiya
├── DEPLOYMENT.md               # Deploy qilish bo'yicha qo'llanma
├── QUICKSTART.md               # Tezkor boshlash qo'llanmasi
├── PROJECT-STRUCTURE.md        # Bu fayl
├── sample-test.txt             # Test uchun namuna fayl
└── .gitignore                  # Git ignore fayli
```

## 🔍 Komponentlar Tushuntirishi

### Frontend Components

#### 1. **App.jsx**
- Asosiy application komponenti
- State management (step, questions, answers)
- Component routing logikasi
- Props passing parent to child

**Key Features:**
- Step-based navigation (upload → setup → quiz → results)
- Global state management
- Restart functionality

#### 2. **FileUpload.jsx**
- Fayl yuklash interfeysi
- Drag & drop qo'llab-quvvatlash
- File validation
- Backend bilan API integratsiya

**Key Features:**
- Drag and drop zone
- File type validation
- Loading state
- Error handling
- Upload progress

#### 3. **QuizSetup.jsx**
- Test sozlamalari formasi
- Savollar soni va vaqt tanlash
- Validation

**Key Features:**
- Number of questions selection (1 to total)
- Time limit selection (1 to 180 minutes)
- Form validation
- Back navigation

#### 4. **QuizTaking.jsx**
- Test yechish asosiy komponenti
- Timer functionality
- Question navigation
- Answer selection

**Key Features:**
- Countdown timer (minutes:seconds)
- Question grid navigation
- Progress tracking
- Answer persistence
- Warning before finish (unanswered questions)
- Auto-submit on time expire
- Random question and option ordering

#### 5. **QuizResults.jsx**
- Natijalarni ko'rsatish
- Statistika (correct, incorrect, percentage)
- Filter functionality
- Detailed review

**Key Features:**
- Summary statistics (cards)
- Percentage calculation
- Filter buttons (all, correct, incorrect)
- Detailed question review
- Correct answer highlighting
- User answer vs correct answer comparison
- Restart functionality

### Backend Files

#### 1. **server.js**
- Express server setup
- Middleware configuration (CORS, JSON, Multer)
- File upload endpoint (/api/upload)
- Error handling

**Key Features:**
- Multer file upload configuration
- File type validation
- File size limit (10MB)
- Automatic cleanup after processing
- CORS enabled

#### 2. **fileProcessor.js**
- Multi-format file processing
- Question extraction logikasi
- Data validation

**Supported Formats:**
- TXT/CSV: Text parsing with pipe delimiter
- XLSX/XLS: Excel sheet reading
- DOCX/DOC: Word document text extraction
- PDF: PDF text extraction

**Processing Logic:**
1. File format detection
2. Content extraction
3. Line/row parsing
4. Question object creation
5. Validation
6. Return processed questions

## 🔄 Data Flow

### 1. File Upload Flow
```
User selects file
    ↓
FileUpload component
    ↓
Send to backend (/api/upload)
    ↓
Multer saves file temporarily
    ↓
fileProcessor extracts questions
    ↓
Return questions array
    ↓
Delete temporary file
    ↓
Frontend receives questions
    ↓
Navigate to Setup
```

### 2. Quiz Taking Flow
```
User sets config (numQuestions, timeLimit)
    ↓
QuizSetup component
    ↓
Shuffle questions (random order)
    ↓
Shuffle options (random order)
    ↓
QuizTaking component
    ↓
User selects answers
    ↓
Timer counts down
    ↓
User finishes or time expires
    ↓
Navigate to Results
```

### 3. Results Flow
```
QuizTaking sends answers array
    ↓
QuizResults component
    ↓
Calculate statistics
    ↓
Display summary cards
    ↓
User can filter results
    ↓
Detailed review available
    ↓
Restart option
```

## 📊 State Management

### App.jsx State
```javascript
{
  step: 'upload' | 'setup' | 'quiz' | 'results',
  questions: Array<Question>,
  quizConfig: {
    numQuestions: number,
    timeLimit: number
  },
  answers: Array<Answer>
}
```

### Question Object
```javascript
{
  question: string,
  variant1: string,
  variant2: string,
  variant3: string,
  variant4: string,
  correctAnswer: string,
  id: number,              // Added in QuizTaking
  options: Array<string>   // Shuffled options
}
```

### Answer Object
```javascript
{
  question: Question,
  userAnswer: string | null,
  correctAnswer: string,
  isCorrect: boolean
}
```

## 🎨 Styling

### Tailwind Configuration
- Custom colors (primary, secondary, accent)
- Custom components (btn-primary, btn-secondary, card, etc.)
- Responsive design utilities
- Custom animations (fade-in, slide-in)

### CSS Classes
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.card` - White card with shadow
- `.input-field` - Form input styling
- `.quiz-option` - Quiz option button
- `.quiz-option-selected` - Selected option state
- `.question-number` - Question grid number
- `.question-answered` - Answered question indicator
- `.question-unanswered` - Unanswered question indicator

## 🔐 Environment & Configuration

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- CORS: Enabled for all origins
- File uploads: Local uploads/ directory

### Production
- Frontend: Vercel (https://your-app.vercel.app)
- Backend: Render (https://your-backend.onrender.com)
- CORS: Should be configured for specific origins
- File uploads: Temporary, cleaned after processing

## 🧪 Testing

### Local Testing
1. Run backend: `cd backend && npm start`
2. Run frontend: `cd frontend && npm run dev`
3. Use sample-test.txt for testing
4. Test all features:
   - File upload
   - Different file formats
   - Quiz taking
   - Timer
   - Navigation
   - Results and filtering

### Production Testing
1. Deploy both frontend and backend
2. Update API URL in FileUpload.jsx
3. Test with real files
4. Check console for errors
5. Test on different devices/browsers

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.6.0"
}
```

### Frontend Dev Dependencies
```json
{
  "vite": "^5.0.8",
  "@vitejs/plugin-react": "^4.2.1",
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "multer": "^1.4.5-lts.1",
  "xlsx": "latest",
  "mammoth": "^1.6.0",
  "pdf-parse": "^1.1.1"
}
```

## 🚀 Performance Optimizations

### Frontend
- Lazy loading (potential future addition)
- Memoization of shuffled questions
- Efficient state updates
- Minimal re-renders

### Backend
- Temporary file cleanup
- File size limits
- Efficient file processing
- Error handling

## 🔮 Future Enhancements

### Planned Features
1. **User Authentication**
   - Sign up / Login
   - User profiles
   - Saved test history

2. **Database Integration**
   - MongoDB or PostgreSQL
   - Persistent test history
   - User analytics

3. **Advanced Features**
   - Test categories
   - Multiple choice variants (5, 6 options)
   - Image support in questions
   - Test sharing
   - Leaderboards
   - Time-based challenges

4. **Mobile App**
   - React Native version
   - Offline support
   - Push notifications

## 📝 Code Style

- ES6+ features
- Functional components (React Hooks)
- Async/await for promises
- Consistent naming conventions
- Comments for complex logic
- Error handling best practices

## 🐛 Known Issues

1. Free tier limitations (Render sleeps after 15 min)
2. No persistent storage (results lost on refresh)
3. Limited file validation on frontend
4. Single language support (Uzbek)

## 📄 License

MIT License - Free to use and modify
