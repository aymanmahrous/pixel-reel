# ⚡ دليل البدء السريع

هذا الدليل يساعدك على نشر الموقع بسرعة في 5 خطوات فقط!

---

## 📋 المتطلبات

- حساب GitHub
- حساب Render (مجاني)
- حساب Supabase (موجود بالفعل)
- دومين (اختياري)

---

## 🚀 الخطوات الخمس

### الخطوة 1️⃣: إنشاء مستودع GitHub (5 دقائق)

```bash
# 1. انتقل إلى https://github.com/new
# 2. أنشئ مستودع باسم "pixel-reel"
# 3. اختر "Private"
# 4. انسخ الرابط (مثلاً: https://github.com/YOUR_USERNAME/pixel-reel.git)

# 5. في Terminal، قم بـ:
cd ~/pixel-reel-project
git remote add origin https://github.com/YOUR_USERNAME/pixel-reel.git
git branch -M main
git push -u origin main
```

✅ **تم!** الكود الآن على GitHub

---

### الخطوة 2️⃣: إعداد Render (10 دقائق)

```bash
# 1. انتقل إلى https://render.com
# 2. اضغط "Get Started"
# 3. اختر "Sign up with GitHub"
# 4. اسمح لـ Render بالوصول إلى GitHub
```

**في لوحة تحكم Render:**

1. اضغط "New +"
2. اختر "Web Service"
3. اختر "Connect a repository"
4. ابحث عن `pixel-reel` واختره
5. اضغط "Connect"

**ملأ الإعدادات:**

| الحقل | القيمة |
|-------|--------|
| Name | `pixel-reel` |
| Environment | `Node` |
| Region | `Frankfurt` (أو الأقرب لك) |
| Branch | `main` |
| Build Command | `npm install --legacy-peer-deps && npm run build` |
| Start Command | `npm run preview` |

✅ **تم!** الآن ننتقل إلى متغيرات البيئة

---

### الخطوة 3️⃣: إضافة متغيرات البيئة (5 دقائق)

**في Render، اضغط على "Add Environment Variable" وأضف:**

```
VITE_SUPABASE_URL = https://dwdywurpcebxznqzmgch.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZHl3dXJwY2VieHpucXptZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzgzMDEsImV4cCI6MjA5NjAxNDMwMX0.F0n_H96cUwhoFfC0sfgH2ZYGeyjkJZntwchEfIJs4Nw
SUPABASE_URL = https://dwdywurpcebxznqzmgch.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZHl3dXJwY2VieHpucXptZ2NoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDQzODMwMSwiZXhwIjoyMDk2MDE0MzAxfQ.ufvHvWGPWvXNZdMkpKZRSVVVVVVVVVVVVVVVVVVVVVV
STRIPE_SANDBOX_API_KEY = sk_test_YOUR_KEY
PAYMENTS_SANDBOX_WEBHOOK_SECRET = whsec_test_YOUR_SECRET
LOVABLE_API_KEY = YOUR_LOVABLE_KEY
NODE_ENV = production
```

✅ **تم!** الآن اضغط "Create Web Service"

---

### الخطوة 4️⃣: انتظر النشر (10 دقائق)

Render سيقوم بـ:

1. ✅ تحميل الكود من GitHub
2. ✅ تثبيت المكتبات
3. ✅ بناء التطبيق
4. ✅ تشغيل الخادم

**ستظهر رسالة "Live" عندما ينتهي.**

---

### الخطوة 5️⃣: اختبر الموقع (5 دقائق)

1. انتقل إلى `https://pixel-reel.onrender.com`
2. تحقق من أن الموقع يعمل
3. جرّب التسجيل والدخول
4. جرّب لوحة التحكم

✅ **مبروك!** الموقع الآن مباشر! 🎉

---

## 🌐 ربط الدومين (اختياري)

إذا أردت استخدام دومينك الخاص (مثلاً `pixelreel.studio`):

### 1. شراء الدومين

- انتقل إلى https://www.namecheap.com
- ابحث عن الدومين
- أكمل الشراء

### 2. ربط الدومين بـ Render

- في Render، اذهب إلى **Settings**
- ابحث عن **Custom Domain**
- أضف دومينك

### 3. تحديث DNS

- في Namecheap، اذهب إلى **Advanced DNS**
- أضف سجل CNAME:

```
Host: @
Type: CNAME
Value: pixel-reel.onrender.com
TTL: 3600
```

### 4. انتظر 24-48 ساعة

بعد التحديث، انتقل إلى `https://pixelreel.studio` ✅

---

## 🎯 الخطوات التالية

بعد النشر الناجح:

1. **اختبر الميزات:**
   - صفحة المصادقة: `/auth`
   - لوحة التحكم: `/dashboard`
   - استوديو AI: `/design`

2. **أضف محتوى:**
   - عدّل الخدمات والأسعار
   - أضف صورك الخاصة
   - خصص الألوان والعلامة التجارية

3. **ربط الدفع:**
   - أضف مفاتيح Stripe الفعلية
   - اختبر عملية الدفع
   - فعّل الاشتراكات

4. **أطلق الموقع:**
   - أخبر الآخرين عن موقعك
   - شارك الرابط على وسائل التواصل
   - ابدأ في استقبال الطلبات

---

## 🆘 استكشاف الأخطاء السريع

| المشكلة | الحل |
|--------|------|
| **Build failed** | تحقق من سجلات Render > جرّب `npm install --legacy-peer-deps` محلياً |
| **Database error** | تحقق من متغيرات البيئة > تأكد من أن Supabase متاح |
| **Blank page** | امسح ذاكرة التخزين المؤقت > أعد تحميل الصفحة |
| **Stripe error** | تحقق من مفاتيح Stripe > استخدم مفاتيح Sandbox للاختبار |

---

## 📚 الأدلة التفصيلية

للمزيد من المعلومات، انظر:

- 📖 [GITHUB_SETUP.md](./GITHUB_SETUP.md) - شرح مفصل لـ GitHub و Render
- 🌐 [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) - شرح ربط الدومين
- 🔧 [MAINTENANCE.md](./MAINTENANCE.md) - شرح الصيانة والتحديثات
- 🎨 [FEATURES.md](./FEATURES.md) - شرح الميزات الجديدة

---

## 💡 نصائح مهمة

1. **احفظ كلمات المرور:** احفظ جميع كلمات المرور في مكان آمن
2. **لا تشارك المفاتيح:** لا تضع مفاتيح API في المستودع العام
3. **اختبر محلياً أولاً:** اختبر التغييرات قبل الدفع إلى GitHub
4. **راقب الأخطاء:** تحقق من سجلات Render بانتظام

---

## 🎓 تعلم المزيد

- 📚 [توثيق Render](https://render.com/docs)
- 📚 [توثيق Supabase](https://supabase.com/docs)
- 📚 [توثيق Stripe](https://stripe.com/docs)
- 📚 [توثيق React](https://react.dev)

---

## 📞 الدعم

إذا واجهت مشاكل:

- 📧 البريد: ayman@pixelreel.studio
- 💬 WhatsApp: +971 58 825 9848
- 📱 Telegram: @pixelreel

---

**تم النشر بنجاح! 🎉**

الآن لديك موقع احترافي يعمل بكامل طاقته!

---

**آخر تحديث:** يونيو 2026
