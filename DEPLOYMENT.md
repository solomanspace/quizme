# QuizMe Deploy Bo'yicha Batafsil Qo'llanma

## Bosqichma-bosqich Deploy

### 1-Qadam: GitHub Repository Yaratish

1. [GitHub.com](https://github.com)ga kiring
2. "New repository" tugmasini bosing
3. Repository nomi: `quizme`
4. Public yoki Private tanlang
5. "Create repository" tugmasini bosing

### 2-Qadam: Kodlarni GitHub ga yuklash

```bash
cd quizme
git init
git add .
git commit -m "Initial commit: QuizMe project"
git branch -M main
git remote add origin https://github.com/USERNAME/quizme.git
git push -u origin main
```

### 3-Qadam: Backend Deploy (Render.com)

#### A. Render.com da akkaunt yaratish
1. [render.com](https://render.com)ga o'ting
2. "Get Started" > GitHub bilan kirish
3. GitHub akkauntingizni ulang

#### B. Backend Service yaratish
1. Dashboard da "New +" tugmasini bosing
2. "Web Service" tanlang
3. GitHub repository ni ulang (quizme)
4. Quyidagi sozlamalarni kiriting:

**Basic Settings:**
- Name: `quizme-backend`
- Region: Choose closest (Frankfurt yoki Amsterdam yaxshi)
- Branch: `main`
- Root Directory: `backend`
- Runtime: `Node`

**Build & Deploy:**
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Free (yoki $7/month uchun Starter)

5. "Advanced" > Environment Variables:
   - Hozircha kerak emas

6. "Create Web Service" tugmasini bosing

#### C. Deployment kutish
- 5-10 daqiqa kutasiz
- "Logs" da jarayonni kuzatasiz
- Deploy tugagach, URL ko'rinadi: `https://quizme-backend.onrender.com`

#### D. Backend test qilish
Browser da: `https://quizme-backend.onrender.com`

Ko'rinish: `{"message":"QuizMe API is running"}`

**Muhim:** Backend URL ni saqlab qo'ying!

### 4-Qadam: Frontend Tayyorlash

#### Backend URL ni frontendga qo'shish

`frontend/src/components/FileUpload.jsx` faylini oching va o'zgartiring:

```javascript
// 29-qator atrofida
const response = await axios.post('/api/upload', formData, {

// Buni quyidagiga o'zgartiring (backend URL ni kiriting):
const response = await axios.post('https://quizme-backend.onrender.com/api/upload', formData, {
```

O'zgarishni GitHub ga yuklang:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### 5-Qadam: Frontend Deploy (Vercel)

#### A. Vercel akkaunt yaratish
1. [vercel.com](https://vercel.com)ga o'ting
2. "Sign Up" > GitHub bilan kirish
3. Ruxsatlarni tasdiqlang

#### B. Project Deploy qilish
1. "Add New..." > "Project" tugmasini bosing
2. "Import Git Repository" > quizme ni tanlang
3. "Import" tugmasini bosing

#### C. Deploy sozlamalari
**Framework Preset:** Vite

**Root Directory:** `frontend` (Edit tugmasini bosing va o'zgartiring)

**Build & Development Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables:**
- Hozircha kerak emas (URL hardcoded qildik)

4. "Deploy" tugmasini bosing

#### D. Deployment kutish
- 2-5 daqiqa
- Deploy tugagach URL ko'rinadi: `https://quizme.vercel.app`

### 6-Qadam: Test qilish

1. Frontend URL ga kiring: `https://quizme.vercel.app`
2. Sample test faylni yuklang (`sample-test.txt`)
3. Test sozlamalarini belgilang
4. Testni yechib ko'ring
5. Natijalarni ko'ring

## Muammolarni Hal Qilish

### Backend bilan bog'lanish muammosi

**Xato:** "Network Error" yoki "Server bilan bog'lanishda xatolik"

**Yechim:**
1. Backend URL to'g'ri yozilganligini tekshiring
2. Backend Render da "Active" holatda ekanligini tekshiring
3. Browser Console ni oching (F12) va xatoni ko'ring
4. CORS muammosi bo'lishi mumkin - backend `cors` o'rnatilganligini tekshiring

### Fayl yuklash muammosi

**Xato:** "Faylni yuklashda xatolik"

**Yechim:**
1. Fayl hajmi 10MB dan kichik bo'lishi kerak
2. Fayl formati to'g'ri ekanligini tekshiring
3. Test fayl formati to'g'ri bo'lishi kerak (pipe `|` bilan ajratilgan)

### Vercel deploy muammosi

**Xato:** Build failed

**Yechim:**
1. `package.json` da barcha dependencies mavjudligini tekshiring
2. Local da `npm run build` ishga tushirib ko'ring
3. Vercel logs ni o'qing
4. Root Directory to'g'ri sozlanganligini tekshiring (`frontend`)

### Render free tier cheklovlari

Render free plan da:
- Service 15 daqiqa aktivlik yo'qligida "sleep" ga o'tadi
- Birinchi request 30-60 soniya kutishni talab qilishi mumkin
- Bu normal, ishonchsiz emas

**Yechim:**
- Starter plan ($7/month) ga upgrade qiling
- Yoki UptimeRobot kabi xizmatdan foydalanib, har 5 daqiqada ping qiling

## Environment Variables (Kelajak uchun)

Production da environment variables ishlatish yaxshiroq.

### Backend (.env)
```
PORT=5000
NODE_ENV=production
MAX_FILE_SIZE=10485760
```

### Frontend (.env)
```
VITE_API_URL=https://quizme-backend.onrender.com
```

## Custom Domain (Ixtiyoriy)

### Vercel
1. Settings > Domains
2. "Add" > domain nomingizni kiriting
3. DNS sozlamalarini o'zgartiring

### Render
1. Settings > Custom Domain
2. Domain nomini kiriting
3. DNS CNAME record qo'shing

## Monitoring va Analytics

### Render
- Dashboard > Metrics - CPU, RAM, Request count
- Logs - Real-time logs

### Vercel
- Analytics tab - Performance, visitors
- Logs - Deployment va function logs

## Yangilash (Update)

Kodda o'zgarish qilganingizda:

```bash
git add .
git commit -m "Update: description"
git push
```

- Vercel avtomatik rebuild qiladi
- Render avtomatik rebuild qiladi

## Xavfsizlik Tavsiyalari

1. **Rate Limiting:** Express rate limiter qo'shing
2. **File Validation:** Fayllarni diqqat bilan tekshiring
3. **Error Handling:** Foydalanuvchiga sensitive ma'lumotlarni ko'rsatmang
4. **HTTPS:** Albatta HTTPS ishlatilishini tekshiring
5. **CORS:** Faqat kerakli domenlarni ruxsat bering

## Keyingi Qadamlar

✅ Deploy tugadi!

Kelajakda qo'shishingiz mumkin bo'lgan xususiyatlar:
- User authentication
- Database (MongoDB, PostgreSQL)
- Email notifications
- Test statistics va history
- Admin panel
- API documentation

---

**Savollar bo'lsa:**
- Render documentation: https://render.com/docs
- Vercel documentation: https://vercel.com/docs
- Stack Overflow da qidiring

**Omad tilayman! 🚀**
