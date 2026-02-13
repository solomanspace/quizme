# 🚀 Netlify Deploy - Vizual Qo'llanma

## Tezkor Deploy (15 daqiqa)

### ⚡ UMUMIY QADAM

```
Backend (Render) → Frontend URL Yangilash → Frontend (Netlify) → Test
     5 daqiqa              2 daqiqa               3 daqiqa       2 daqiqa
```

---

## 📋 BOSQICH 1: GitHub Tayyorlash (3 daqiqa)

### 1.1 GitHub Repository Yaratish

```
GitHub.com → New Repository → quizme → Public → Create
```

### 1.2 Kodlarni Yuklash

```bash
cd quizme
git init
git add .
git commit -m "QuizMe initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/quizme.git
git push -u origin main
```

✅ **Natija:** Kod GitHub da

---

## 🔧 BOSQICH 2: Backend Deploy - Render (5 daqiqa)

### 2.1 Render.com ga Kirish

```
render.com → Sign Up → GitHub bilan login → Allow access
```

### 2.2 Backend Service Yaratish

```
Dashboard → New + → Web Service → Connect GitHub repo (quizme)
```

### 2.3 Sozlamalar

**Name:** `quizme-backend`

**Root Directory:** `backend` ⚠️ Bu juda muhim!

**Build Command:** `npm install`

**Start Command:** `npm start`

**Instance Type:** Free

```
[Create Web Service] tugmasini bosing
```

### 2.4 Deploy Kutish

```
Building... ⏳ (2-3 daqiqa)
Live ✅
```

### 2.5 URL Nusxalash

```
https://quizme-backend.onrender.com
```

📝 **Bu URL ni saqlang - kerak bo'ladi!**

---

## 🔄 BOSQICH 3: Frontend Kodni Yangilash (2 daqiqa)

### 3.1 FileUpload.jsx Faylni Ochish

```
quizme/frontend/src/components/FileUpload.jsx
```

### 3.2 API URL ni O'zgartirish

**29-qator atrofida toping:**

```javascript
const response = await axios.post('/api/upload', formData, {
```

**Quyidagiga o'zgartiring:**

```javascript
const response = await axios.post('https://quizme-backend.onrender.com/api/upload', formData, {
```

⚠️ **Muhim:** `quizme-backend.onrender.com` o'rniga o'z backend URL ingizni qo'ying!

### 3.3 Saqlash va GitHub ga Yuklash

```bash
git add .
git commit -m "Update: production API URL"
git push
```

✅ **Natija:** Frontend backend bilan bog'langan

---

## 🌐 BOSQICH 4: Frontend Deploy - Netlify (3 daqiqa)

### 4.1 Netlify ga Kirish

```
netlify.com → Sign Up → GitHub bilan login → Authorize
```

### 4.2 Site Yaratish

```
Sites → Add new site → Import an existing project
```

### 4.3 GitHub Ulash

```
Deploy with GitHub → quizme repository ni tanlang → Import
```

### 4.4 Deploy Sozlamalari

⚠️ **Diqqat bilan to'ldiring:**

```
Site name: quizme (yoki boshqa nom)
Branch to deploy: main
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

**Vizual ko'rinish:**

```
┌─────────────────────────────────────┐
│ Site settings                        │
├─────────────────────────────────────┤
│ Owner: YOUR_TEAM                    │
│ Branch: main                        │
│ Base directory: frontend            │ ← MUHIM
│ Build command: npm run build        │
│ Publish dir: frontend/dist          │ ← MUHIM
└─────────────────────────────────────┘
```

### 4.5 Deploy Boshlash

```
[Deploy site] tugmasini bosing
```

### 4.6 Deploy Kutish

```
Initializing... ⏳
Building... ⏳ (1-2 daqiqa)
Deploying... ⏳
Published ✅
```

### 4.7 URL Olish

```
https://random-name-12345.netlify.app
```

✅ **Tayyor!** Bu sizning QuizMe saytingiz!

---

## ✅ BOSQICH 5: Test Qilish (2 daqiqa)

### 5.1 Saytni Ochish

Browser da Netlify URL ni oching

### 5.2 Fayl Yuklash

1. `sample-test.txt` faylni tanlang
2. Yoki o'z test faylingizni yarating:

```
2+2=? | 3 | 4 | 5 | 6 | 4
Test savoli? | A | B | C | D | B
```

### 5.3 Test O'tkazish

1. Fayl yuklang ✅
2. Sozlamalarni o'rnating (10 savol, 5 daqiqa) ✅
3. Testni boshlang ✅
4. Javob bering ✅
5. Natijani ko'ring ✅

### 5.4 Muammolar Yo'qligini Tekshirish

- ✅ Fayl yuklandi
- ✅ Savollar ko'rsatildi
- ✅ Timer ishlayapti
- ✅ Javoblar saqlanayapti
- ✅ Natijalar to'g'ri

---

## 🎯 NATIJA

### Sizda endi:

✅ **Live Website:** `https://your-site.netlify.app`
✅ **Backend API:** `https://your-backend.onrender.com`
✅ **GitHub Repository:** Public/Private
✅ **Auto Deploy:** Har push da yangilanadi

---

## 🔄 KELAJAKDA YANGILASH

### Kod o'zgartirish:

```bash
# 1. Kodni o'zgartiring
# 2. GitHub ga yuklang
git add .
git commit -m "Feature: new functionality"
git push

# 3. Avtomatik deploy bo'ladi!
```

**Netlify:** 2-3 daqiqa ichida yangilanadi
**Render:** 3-5 daqiqa ichida yangilanadi

---

## 📱 NETLIFY DASHBOARD

### Site Overview

```
📊 Production URL
📈 Deploy status
📝 Latest deploys
⚙️ Site settings
```

### Site Settings

```
🌐 Domain management
🔧 Build settings
🔐 Environment variables
🔄 Deploy notifications
```

### Deploys

```
📋 Deploy history
🔙 Rollback option
📊 Build logs
⏱️ Deploy time
```

---

## 🎨 CUSTOM DOMAIN (Ixtiyoriy)

### Netlify da Domain Qo'shish

```
Site settings → Domain management → Add custom domain
```

**Misol:**
- `quizme.uz`
- `test.mydomain.com`

### DNS Sozlash

Netlify sizga DNS sozlamalarini beradi:

```
Type: CNAME
Name: www
Value: your-site.netlify.app
```

---

## 🛠️ MUAMMOLARNI HAL QILISH

### ❌ Build Failed

**Sabab:** Build settings noto'g'ri

**Yechim:**
```
Site settings → Build & deploy → Edit settings
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

### ❌ 404 on Refresh

**Sabab:** Redirects sozlanmagan

**Yechim:** `frontend/public/_redirects` mavjud (allaqachon qo'shilgan)

### ❌ Backend Error

**Sabab:** API URL noto'g'ri yoki backend uxlab qolgan

**Yechim:**
1. Backend URL ni tekshiring
2. Render dashboard ga o'ting
3. Service "Active" bo'lishi kerak
4. Birinchi request 30-60 soniya kutishi mumkin (free tier)

### ❌ CORS Error

**Sabab:** Backend CORS sozlanmagan

**Yechim:** Backend `server.js` da `cors()` middleware qo'shilgan (✅ allaqachon bor)

---

## 💡 PRO TIPS

### 1. Preview Deploys
Har bir pull request uchun preview deploy yaratiladi

### 2. Deploy Logs
Har doim deploy logs ni tekshiring

### 3. Rollback
Xato bo'lsa, oldingi versiyaga qaytish mumkin

### 4. Environment Variables
Productionni localdan ajratish uchun ishlatiladi

### 5. Branch Deploys
`main` dan tashqari branchlar uchun ham deploy qilish mumkin

---

## 📊 MONITORING

### Netlify Analytics (Pro)
- Visitor count
- Page views
- Bandwidth usage

### Render Metrics
- CPU usage
- Memory usage
- Request count

### Browser Console
F12 → Console → Xatolarni kuzatish

---

## 🔐 XAVFSIZLIK

### HTTPS
✅ Avtomatik HTTPS (Let's Encrypt)

### Headers
✅ Security headers qo'shilgan (`netlify.toml` da)

### Environment Variables
Sensitive ma'lumotlarni `.env` da saqlang

---

## 💰 NARXLAR

### Netlify Free Tier
- ✅ 100GB bandwidth
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ Custom domain
- ✅ HTTPS

### Render Free Tier
- ✅ 750 hours/month
- ✅ 512MB RAM
- ⚠️ Sleeps after 15 min inactivity

**Jami:** $0/month (Free!) 🎉

---

## 📚 QO'SHIMCHA RESURSLAR

- [Netlify Docs](https://docs.netlify.com)
- [Render Docs](https://render.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)

---

## ✅ CHECKLIST

Deploy qilishdan avval:

- [ ] GitHub repository yaratilgan
- [ ] Backend Render da deploy qilingan
- [ ] Backend URL frontend ga qo'shilgan
- [ ] Git commit va push qilingan
- [ ] Netlify settings to'g'ri
- [ ] Sample fayl bilan test qilingan

Deploy qilgandan keyin:

- [ ] Sayt ochiladi
- [ ] Fayl yuklanadi
- [ ] Test ishlaydi
- [ ] Natijalar ko'rsatiladi
- [ ] Hech qanday console error yo'q

---

## 🎊 TAYYORSIZ!

**Sizning QuizMe saytingiz Live!**

```
🌐 Frontend: https://your-site.netlify.app
🔧 Backend: https://your-backend.onrender.com
💻 Code: https://github.com/username/quizme
```

**Omad tilayman! 🚀**

Savollar bo'lsa, NETLIFY-DEPLOY.md faylni o'qing!
