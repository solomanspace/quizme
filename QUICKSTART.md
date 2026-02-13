# QuizMe - Tezkor Boshlash

## 🚀 5 Daqiqada Ishga Tushirish

### 1. Fayllarni yuklab oling
Ushbu papkadagi barcha fayllarni kompyuteringizga yuklab oling.

### 2. Backend ishga tushirish

```bash
cd backend
npm install
npm start
```

✅ Backend ishga tushdi: http://localhost:5000

### 3. Frontend ishga tushirish (yangi terminal oynasida)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend ishga tushdi: http://localhost:3000

### 4. Test qiling
1. Brauzerda http://localhost:3000 ga o'ting
2. `sample-test.txt` faylni yuklang
3. Test sozlamalarini o'rnating
4. Testni yechib ko'ring!

---

## 🌐 Deploy Qilish

Deploy qilish uchun `DEPLOYMENT.md` faylni o'qing.

**Qisqacha:**
1. GitHub ga yuklang
2. Backend → Render.com
3. Frontend → Vercel.com

Deploy qilish 15-20 daqiqa oladi.

---

## 📁 Fayl Formati

Test fayl quyidagi formatda bo'lishi kerak:

```
savol | variant1 | variant2 | variant3 | variant4 | to'g'ri_javob
```

**Misol:**
```
2+2=? | 3 | 4 | 5 | 6 | 4
O'zbekistonning poytaxti? | Toshkent | Samarqand | Buxoro | Xiva | Toshkent
```

Qo'llab-quvvatlanadigan formatlar:
- ✅ .txt
- ✅ .csv
- ✅ .xlsx / .xls
- ✅ .docx / .doc
- ✅ .pdf

---

## 🛠️ Texnologiyalar

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express
- **File Processing:** SheetJS, Mammoth, PDF-Parse

---

## ❓ Muammolar?

**Backend ishga tushmasa:**
1. Port 5000 band emasligini tekshiring
2. Node.js versiyasi 16+ ekanligini tekshiring
3. `npm install` qayta ishga tushiring

**Frontend backend bilan bog'lanmasa:**
1. Backend ishlaganligini tekshiring (http://localhost:5000)
2. Browser console da xatolarni ko'ring (F12)

**Fayl yuklanmasa:**
1. Fayl hajmi 10MB dan kichik bo'lishi kerak
2. Fayl formati to'g'ri bo'lishi kerak
3. Sample fayl bilan test qiling

---

## 📚 Qo'shimcha

- To'liq dokumentatsiya: `README.md`
- Deploy bo'yicha qo'llanma: `DEPLOYMENT.md`
- Test uchun namuna fayl: `sample-test.txt`

---

## 🎯 Qisqa Deploy Yo'riqnomasi

### Backend (Render.com)
```
1. render.com da akkaunt oching
2. New Web Service
3. GitHub repo ni ulang
4. Root Directory: backend
5. Build: npm install
6. Start: npm start
7. Deploy!
```

### Frontend (Vercel.com)
```
1. vercel.com da akkaunt oching
2. New Project
3. GitHub repo ni import qiling
4. Root Directory: frontend
5. Framework: Vite
6. Deploy!
7. FileUpload.jsx da API URL ni o'zgartiring
```

---

**Tayyor! Omad tilayman! 🚀**

Savollar: README.md va DEPLOYMENT.md fayllarni o'qing.
