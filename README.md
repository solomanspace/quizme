# QuizMe - Test Platformasi

QuizMe - bu foydalanuvchilarga o'z test fayllarini yuklash va online test topshirish imkonini beruvchi platforma.

## Xususiyatlar

- ✅ Ko'p formatli fayllarni qo'llab-quvvatlash (.pdf, .xlsx, .docx, .txt, .csv)
- ✅ Tasodifiy savollar va variantlar
- ✅ Timer bilan test yechish
- ✅ Real-time progress tracking
- ✅ Batafsil natijalar va statistika
- ✅ Filtrli natijalar ko'rish (to'g'ri, noto'g'ri, hammasi)
- ✅ Responsive dizayn
- ✅ Sodda va qulay interfeys

## Test Fayl Formati

Faylda savollar quyidagi formatda bo'lishi kerak:

```
savol | variant 1 | variant 2 | variant 3 | variant 4 | to'g'ri javob
1+1=? | 3 | 34 | 2 | 5 | 2
```

## Texnologiyalar

### Frontend
- React + Vite
- Tailwind CSS
- Axios

### Backend
- Node.js + Express
- Multer (file uploads)
- SheetJS (xlsx)
- Mammoth (docx)
- PDF-Parse (pdf)

## Local Development

### Backend Setup

```bash
cd backend
npm install
npm start
```

Backend: http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:3000

## Deploy qilish

### 1. Backend Deploy (Render.com)

1. [Render.com](https://render.com)ga kiring
2. "New +" > "Web Service" tanlang
3. GitHub repository ulanish
4. Settings:
   - **Name:** quizme-backend
   - **Root Directory:** backend
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. "Create Web Service" tugmasini bosing
6. Backend URL ni nusxalang (masalan: https://quizme-backend.onrender.com)

### 2. Frontend Deploy (Vercel)

1. [Vercel.com](https://vercel.com)ga kiring
2. "New Project" tugmasini bosing
3. GitHub repository import qiling
4. Settings:
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist
5. Environment Variables qo'shing:
   - `VITE_API_URL` = Backend URL (Render.com dan)
6. "Deploy" tugmasini bosing

### 3. Frontend kodni yangilash

`frontend/src/components/FileUpload.jsx` faylida API URL ni yangilang:

```javascript
// O'rniga:
const response = await axios.post('/api/upload', formData, {

// Quyidagini yozing:
const response = await axios.post('https://your-backend-url.onrender.com/api/upload', formData, {
```

### Alternative: Railway.app (Backend uchun)

1. [Railway.app](https://railway.app)ga kiring
2. "New Project" > "Deploy from GitHub repo"
3. Repository tanlang
4. Settings > Root Directory: `backend`
5. Deploy bo'ladi va URL olasiz

### Alternative: Netlify (Frontend uchun)

1. [Netlify.com](https://netlify.com)ga kiring
2. "Add new site" > "Import an existing project"
3. GitHub repo tanlang
4. Settings:
   - **Base directory:** frontend
   - **Build command:** `npm run build`
   - **Publish directory:** frontend/dist
5. Environment variables qo'shing
6. Deploy

## Fayllarni Test qilish

Test uchun namuna fayl yarating (`test.txt`):

```
2+2=? | 3 | 4 | 5 | 6 | 4
O'zbekistonning poytaxti? | Toshkent | Samarqand | Buxoro | Xiva | Toshkent
1 kg da necha gramm bor? | 100 | 500 | 1000 | 10000 | 1000
```

Yoki Excel faylida:

| Savol | Variant 1 | Variant 2 | Variant 3 | Variant 4 | To'g'ri javob |
|-------|-----------|-----------|-----------|-----------|---------------|
| 2+2=? | 3 | 4 | 5 | 6 | 4 |

## Xatoliklarni Tuzatish

### Backend ishlamasa:
- `uploads` papkasi mavjudligini tekshiring
- Port 5000 bo'sh ekanligini tekshiring
- `npm install` qayta ishga tushiring

### Frontend backend bilan bog'lanmasa:
- CORS sozlamalarini tekshiring
- API URL to'g'ri ekanligini tekshiring
- Browser console da xatolarni ko'ring

### Fayl yuklanmasa:
- Fayl hajmi 10MB dan kichik ekanligini tekshiring
- Fayl formati to'g'ri ekanligini tekshiring
- Fayl strukturasi to'g'ri formatda ekanligini tekshiring

## Production Optimizatsiyasi

### Backend
- Environment variables ishlatish (.env)
- Error logging qo'shish
- Rate limiting qo'shish
- File upload validatsiyalarni kuchaytirish

### Frontend
- Build minification
- Image optimizatsiya
- Lazy loading
- Caching strategiyalari

## Kelgusidagi Yaxshilanishlar

- [ ] User authentication (Sign up/Login)
- [ ] Test history saqlash
- [ ] Multiple choice variants (5, 6 va boshqa)
- [ ] Test yaratish interfeysi
- [ ] Test sharing
- [ ] Kategoriyalar bo'yicha testlar
- [ ] Leaderboard
- [ ] Mobile app

## Litsenziya

MIT License

## Muallif

Junior Web Developer

---

**Muhim eslatmalar:**
- Bu public sayt, hech qanday ma'lumot saqlanmaydi
- Yuklangan fayllar qayta ishlangandan keyin o'chiriladi
- Test natijalari faqat joriy sessiya uchun ko'rinadi
