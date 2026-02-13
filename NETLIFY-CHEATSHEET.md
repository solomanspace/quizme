# 🚀 QuizMe - Netlify Deploy - Bir Sahifada

## ⚡ 15 Daqiqada Deploy

### 1️⃣ GitHub (3 daqiqa)
```bash
cd quizme
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/quizme.git
git push -u origin main
```

### 2️⃣ Backend - Render.com (5 daqiqa)
```
render.com → New Web Service → GitHub repo
Settings:
  Name: quizme-backend
  Root Directory: backend
  Build: npm install
  Start: npm start
  Type: Free
→ Deploy → URL nusxalang
```

### 3️⃣ Frontend Yangilash (2 daqiqa)
`frontend/src/components/FileUpload.jsx` (29-qator):
```javascript
// O'zgartiring:
const response = await axios.post('https://YOUR-BACKEND.onrender.com/api/upload', formData, {
```
```bash
git add .
git commit -m "Update API URL"
git push
```

### 4️⃣ Frontend - Netlify.com (3 daqiqa)
```
netlify.com → Add new site → Import from Git → GitHub
Settings:
  Base directory: frontend
  Build: npm run build
  Publish: frontend/dist
→ Deploy!
```

### 5️⃣ Test (2 daqiqa)
```
1. Netlify URL ochish
2. sample-test.txt yuklash
3. Test boshlash
4. Natija ko'rish
✅ Tayyor!
```

---

## 📋 Tezkor Checklist

**GitHub:**
- [ ] Repository yaratildi
- [ ] Kod push qilindi

**Backend (Render):**
- [ ] Service yaratildi
- [ ] Root Directory: `backend`
- [ ] Deploy muvaffaqiyatli
- [ ] URL olingan

**Frontend (FileUpload.jsx):**
- [ ] API URL yangilandi
- [ ] Git push qilindi

**Frontend (Netlify):**
- [ ] Site yaratildi
- [ ] Base directory: `frontend`
- [ ] Publish: `frontend/dist`
- [ ] Deploy muvaffaqiyatli

**Test:**
- [ ] Sayt ochiladi
- [ ] Fayl yuklanadi
- [ ] Test ishlaydi
- [ ] Natija ko'rsatiladi

---

## 🆘 Tezkor Yechimlar

**Build Failed?**
```
Netlify Settings → Build & deploy
Base directory: frontend ✓
Publish directory: frontend/dist ✓
```

**Backend Error?**
```
1. Backend URL to'g'ri?
2. Render da "Active"?
3. 30-60s kuting (cold start)
```

**CORS Error?**
```
Backend server.js da:
app.use(cors()); ✓ (allaqachon bor)
```

---

## 📁 Kerakli Fayllar

✅ `netlify.toml` - Netlify config
✅ `frontend/public/_redirects` - SPA routing
✅ `NETLIFY-DEPLOY.md` - To'liq qo'llanma
✅ `NETLIFY-QUICKSTART.md` - Vizual qo'llanma

---

## 🌐 Natija

```
Frontend: https://your-site.netlify.app
Backend:  https://your-backend.onrender.com
GitHub:   https://github.com/username/quizme
```

**Free tier:** $0/month 🎉

---

## 📞 Yordam

Batafsil: `NETLIFY-DEPLOY.md` va `NETLIFY-QUICKSTART.md` fayllar

Omad! 🚀
