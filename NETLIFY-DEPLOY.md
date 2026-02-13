# QuizMe - Netlify Deploy Qo'llanmasi

## 🚀 Netlify ga Deploy Qilish

Netlify Vercel ga o'xshash, lekin ba'zi jihatlarida soddaroq.

---

## USUL 1: GitHub orqali Deploy (Tavsiya etiladi)

### Qadam 1: GitHub Repository Yaratish

1. [GitHub.com](https://github.com) ga kiring
2. **New repository** tugmasini bosing
3. Settings:
   - Repository name: `quizme`
   - Public yoki Private (istalganini)
   - **Create repository**

### Qadam 2: Kodlarni GitHub ga Yuklash

QuizMe papkasiga o'ting va quyidagi buyruqlarni bajaring:

```bash
cd quizme
git init
git add .
git commit -m "Initial commit: QuizMe project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/quizme.git
git push -u origin main
```

**Eslatma:** `YOUR_USERNAME` ni o'z GitHub username ingiz bilan almashtiring!

### Qadam 3: Backend Deploy (Render.com)

Backend uchun Render.com dan foydalanishda davom etamiz (Netlify backend uchun ideal emas).

1. [Render.com](https://render.com) ga o'ting
2. **Get Started** > GitHub bilan login
3. **New +** > **Web Service**
4. GitHub repository ni tanlang: `quizme`
5. Settings:

```
Name: quizme-backend
Region: Frankfurt (yoki yaqin joy)
Branch: main
Root Directory: backend
Runtime: Node

Build Command: npm install
Start Command: npm start

Instance Type: Free
```

6. **Create Web Service** tugmasini bosing
7. 5-10 daqiqa kuting
8. **Backend URL ni ko'chirib oling:** `https://quizme-backend.onrender.com`

### Qadam 4: Frontend API URL ni Yangilash

Backend deploy bo'lgandan keyin, frontend kodini yangilash kerak.

`frontend/src/components/FileUpload.jsx` faylini oching:

**O'zgartirish kerak bo'lgan qator (taxminan 29-qator):**

```javascript
// ESKI (local development uchun):
const response = await axios.post('/api/upload', formData, {

// YANGI (production uchun - backend URL ni kiriting):
const response = await axios.post('https://quizme-backend.onrender.com/api/upload', formData, {
```

**To'liq misol:**

```javascript
const handleUpload = async () => {
  if (!file) {
    setError('Iltimos, fayl tanlang');
    return;
  }

  setLoading(true);
  setError('');

  const formData = new FormData();
  formData.append('file', file);

  try {
    // MUHIM: Bu yerda backend URL ni o'zgartiring
    const response = await axios.post('https://quizme-backend.onrender.com/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.success) {
      onFileProcessed(response.data.questions);
    } else {
      setError(response.data.error || 'Faylni yuklashda xatolik');
    }
  } catch (err) {
    setError(err.response?.data?.error || 'Server bilan bog\'lanishda xatolik');
  } finally {
    setLoading(false);
  }
};
```

O'zgarishni GitHub ga yuklang:

```bash
git add .
git commit -m "Update: Backend URL for production"
git push
```

### Qadam 5: Netlify ga Frontend Deploy

1. [Netlify.com](https://netlify.com) ga o'ting
2. **Sign up** (agar akkaunt yo'q bo'lsa)
3. **GitHub bilan login** qiling
4. **Add new site** > **Import an existing project**

5. **Import from Git** > **GitHub** ni tanlang

6. Repository ni tanlang: `quizme`

7. **Deploy settings:**

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

**To'liq ko'rinish:**
- **Branch to deploy:** main
- **Base directory:** frontend
- **Build command:** npm run build
- **Publish directory:** frontend/dist

8. **Deploy site** tugmasini bosing!

9. 2-5 daqiqa kuting... ☕

10. Deploy tugagach, sizga URL beriladi:
    `https://random-name-123456.netlify.app`

### Qadam 6: Test Qilish

1. Netlify URL ga o'ting
2. Sample test faylni yuklang
3. Test sozlamalarini o'rnating
4. Testni yechib ko'ring!

---

## USUL 2: Netlify CLI orqali Deploy

Agar GitHub ishlatishni istamasangiz, Netlify CLI dan foydalanishingiz mumkin.

### Qadam 1: Netlify CLI O'rnatish

```bash
npm install -g netlify-cli
```

### Qadam 2: Login

```bash
netlify login
```

Browser ochiladi, login qiling.

### Qadam 3: Frontend Build

```bash
cd frontend
npm install
npm run build
```

### Qadam 4: Deploy

```bash
netlify deploy
```

Savollarga javob bering:
- **Create & configure a new site:** Ha
- **Team:** Tanlang
- **Site name:** quizme (yoki boshqa nom)
- **Publish directory:** dist

**Production deploy uchun:**

```bash
netlify deploy --prod
```

---

## Netlify Sozlamalari (Optional)

### Custom Domain Qo'shish

1. Netlify dashboard ga o'ting
2. **Domain settings** > **Add custom domain**
3. Domen nomini kiriting
4. DNS sozlamalarini o'zgartiring (Netlify yo'riqnomasi bo'yicha)

### Environment Variables

Agar environment variables kerak bo'lsa:

1. **Site settings** > **Build & deploy** > **Environment**
2. **Add variable** tugmasini bosing
3. Key va Value kiriting

**Misol:**
```
VITE_API_URL = https://quizme-backend.onrender.com
```

**FileUpload.jsx da foydalanish:**

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const response = await axios.post(`${API_URL}/api/upload`, formData, {
```

### Redirects va Rewrites

Agar routing muammolari bo'lsa, `netlify.toml` fayl yarating:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Netlify vs Vercel

| Xususiyat | Netlify | Vercel |
|-----------|---------|--------|
| Deploy tezligi | Tez | Juda tez |
| Free plan | 100GB bandwidth | 100GB bandwidth |
| Custom domain | ✅ Ha | ✅ Ha |
| CI/CD | ✅ Auto | ✅ Auto |
| Oson foydalanish | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Community | Katta | Katta |

**Xulosa:** Ikkalasi ham ajoyib! Qaysi biri qulay bo'lsa, o'shani ishlating.

---

## Muammolarni Hal Qilish

### Build Failed - "Command not found"

**Sabab:** Build command xato

**Yechim:**
1. Site settings > Build & deploy > Build settings
2. Build command: `npm run build`
3. Publish directory: `dist`

### 404 Error on Page Refresh

**Sabab:** Routing sozlalmagan

**Yechim:** `frontend/public/_redirects` fayl yarating:

```
/*    /index.html   200
```

Yoki `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Backend bilan bog'lanish muammosi

**Xato:** Network Error, CORS error

**Yechim:**
1. Backend URL to'g'ri yozilganligini tekshiring
2. Backend Render da "Active" holatda ekanligini tekshiring
3. Browser console da xatoni ko'ring (F12)
4. Backend CORS sozlangan bo'lishi kerak

### Slow Backend Response

**Sabab:** Render free tier 15 daqiqadan keyin uxlaydi

**Yechim:**
- Birinchi request 30-60 soniya kutishni talab qiladi
- Bu normal
- Yoki Render Starter plan ($7/month) ga upgrade qiling

---

## Production Checklist

Deploy qilishdan oldin tekshiring:

- ✅ Backend Render da deploy qilingan
- ✅ Backend URL frontend ga qo'shilgan
- ✅ Git commit va push qilingan
- ✅ Build command to'g'ri (`npm run build`)
- ✅ Publish directory to'g'ri (`frontend/dist`)
- ✅ Sample fayl bilan test qilingan

---

## Netlify Dashboard

Deploy qilgandan keyin Netlify dashboard da:

### Site Overview
- Deploy status
- Production URL
- Build logs

### Deploys
- Deploy history
- Rollback imkoniyati
- Build logs

### Site Settings
- Domain sozlamalari
- Build sozlamalari
- Environment variables
- Redirect rules

### Analytics (Pro)
- Visitor statistics
- Page views
- Performance metrics

---

## Monitoring

### Netlify da
- **Site overview** > Deploy status
- **Deploys** > Build logs
- **Analytics** (agar pro plan bo'lsa)

### Render da (Backend)
- **Dashboard** > Metrics
- **Logs** > Real-time logs
- **Events** > Deploy history

---

## Auto Deploy (CI/CD)

GitHub ga push qilganingizda avtomatik deploy bo'ladi:

```bash
# Kod o'zgartiring
git add .
git commit -m "Feature: yangi funksiya"
git push

# Netlify avtomatik rebuild qiladi (2-3 daqiqa)
# Render avtomatik rebuild qiladi (3-5 daqiqa)
```

---

## Netlify Functions (Alternative Backend)

Agar Render ishlatishni istamasangiz, Netlify Functions dan foydalanishingiz mumkin (serverless):

### 1. `netlify/functions` papka yarating

```javascript
// netlify/functions/upload.js
const multer = require('multer');
// ... backend logikangiz
```

### 2. `netlify.toml` konfiguratsiya

```toml
[build]
  functions = "netlify/functions"
```

**Ammo:** Netlify Functions fayllar bilan ishlash uchun biroz murakkab. Oddiy loyihalar uchun Render tavsiya etiladi.

---

## Xulosa

### Netlify Deploy Qisqacha:

1. ✅ GitHub ga yuklash
2. ✅ Backend → Render.com
3. ✅ Frontend API URL yangilash
4. ✅ Frontend → Netlify.com
5. ✅ Test qilish

**Umumiy vaqt:** 15-20 daqiqa

**Netlify URL:** https://your-site.netlify.app
**Backend URL:** https://your-backend.onrender.com

---

## Qo'shimcha Resurslar

- [Netlify Docs](https://docs.netlify.com)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Render Docs](https://render.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

**Omad tilayman! 🚀**

Savollar bo'lsa, so'rang!
