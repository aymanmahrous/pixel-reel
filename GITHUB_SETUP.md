# 📝 دليل إعداد GitHub و Render

هذا الدليل يشرح كيفية رفع المشروع على GitHub وربطه بـ Render للنشر التلقائي.

## المرحلة الأولى: إعداد GitHub

### 1. إنشاء حساب GitHub (إذا لم يكن لديك)

1. انتقل إلى https://github.com
2. اضغط على "Sign up"
3. اتبع التعليمات لإنشاء حساب جديد

### 2. إنشاء مستودع جديد

1. بعد تسجيل الدخول، انقر على صورة ملفك الشخصي في الزاوية العلوية اليسرى
2. اختر "Your repositories"
3. اضغط على "New"
4. ملأ التفاصيل:
   - **Repository name:** `pixel-reel`
   - **Description:** "Creative Services Platform with AI Integration"
   - **Visibility:** Private (للخصوصية)
   - **Initialize:** اترك الخيارات الافتراضية

### 3. رفع الكود

افتح Terminal/Command Prompt وقم بتنفيذ الأوامر التالية:

```bash
# انتقل إلى مجلد المشروع
cd ~/pixel-reel-project

# أضف المستودع البعيد
git remote add origin https://github.com/YOUR_USERNAME/pixel-reel.git

# غيّر اسم الفرع إلى main
git branch -M main

# ادفع الكود
git push -u origin main
```

**ملاحظة:** استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك على GitHub.

### 4. التحقق من الرفع

1. انتقل إلى https://github.com/YOUR_USERNAME/pixel-reel
2. تحقق من أن جميع الملفات موجودة

---

## المرحلة الثانية: إعداد Render

### 1. إنشاء حساب Render

1. انتقل إلى https://render.com
2. اضغط على "Get Started"
3. اختر "Sign up with GitHub" (الأسهل)
4. اسمح لـ Render بالوصول إلى حسابك على GitHub

### 2. ربط المستودع

1. في لوحة تحكم Render، اضغط على "New +"
2. اختر "Web Service"
3. اختر "Connect a repository"
4. ابحث عن `pixel-reel` واختره
5. اضغط "Connect"

### 3. إعدادات الخدمة

ملأ الحقول التالية:

| الحقل | القيمة |
|-------|--------|
| **Name** | `pixel-reel` |
| **Environment** | `Node` |
| **Region** | اختر الأقرب (مثلاً Frankfurt) |
| **Branch** | `main` |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Start Command** | `npm run preview` |

### 4. إضافة متغيرات البيئة

1. في قسم "Environment"، اضغط على "Add Environment Variable"
2. أضف المتغيرات التالية:

```
VITE_SUPABASE_URL = https://dwdywurpcebxznqzmgch.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_URL = https://dwdywurpcebxznqzmgch.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SANDBOX_API_KEY = sk_test_...
STRIPE_LIVE_API_KEY = sk_live_...
PAYMENTS_SANDBOX_WEBHOOK_SECRET = whsec_test_...
PAYMENTS_LIVE_WEBHOOK_SECRET = whsec_...
LOVABLE_API_KEY = your_key...
NODE_ENV = production
```

### 5. النشر

1. اضغط على "Create Web Service"
2. سيبدأ Render في بناء وتشغيل التطبيق
3. انتظر حتى يظهر "Live" بجانب اسم الخدمة

---

## المرحلة الثالثة: ربط الدومين

### 1. شراء دومين

إذا لم يكن لديك دومين بعد:

1. انتقل إلى https://www.namecheap.com أو https://www.godaddy.com
2. ابحث عن الدومين الذي تريده (مثلاً `pixelreel.studio`)
3. أكمل عملية الشراء

### 2. ربط الدومين بـ Render

1. في لوحة تحكم Render، اذهب إلى خدمتك `pixel-reel`
2. اضغط على "Settings"
3. ابحث عن "Custom Domain"
4. أضف دومينك (مثلاً `pixelreel.studio`)
5. اضغط "Add"

### 3. تحديث سجلات DNS

Render سيعطيك تعليمات لتحديث سجلات DNS:

1. انتقل إلى لوحة تحكم مزود الدومين الخاص بك
2. ابحث عن "DNS Settings"
3. أضف السجلات التي أعطاك إياها Render (عادة CNAME)
4. انتظر 24-48 ساعة حتى يتم تحديث DNS

### 4. التحقق

بعد تحديث DNS:

1. انتقل إلى `https://pixelreel.studio`
2. تحقق من أن الموقع يعمل بشكل صحيح

---

## المرحلة الرابعة: الإعدادات الإضافية

### تفعيل الإعادة التلقائية

1. في Render، اذهب إلى "Settings"
2. ابحث عن "Auto-Deploy"
3. اختر "Yes" لتفعيل النشر التلقائي عند كل دفع

### إضافة Webhooks

1. في GitHub، اذهب إلى "Settings" > "Webhooks"
2. اضغط على "Add webhook"
3. أضف رابط webhook من Render

### مراقبة الأداء

1. في Render، اذهب إلى "Metrics"
2. راقب استخدام CPU والذاكرة
3. تحقق من السجلات للأخطاء

---

## استكشاف الأخطاء الشائعة

### ❌ خطأ: "Build failed"

**الحل:**
1. تحقق من سجلات البناء في Render
2. تأكد من أن جميع المكتبات مثبتة
3. جرب `npm install --legacy-peer-deps` محلياً

### ❌ خطأ: "Database connection failed"

**الحل:**
1. تحقق من متغيرات البيئة
2. تأكد من أن Supabase متاح
3. جرب الاتصال من جهازك المحلي

### ❌ خطأ: "Stripe webhook not working"

**الحل:**
1. تحقق من `PAYMENTS_SANDBOX_WEBHOOK_SECRET`
2. تأكد من أن الـ webhook URL صحيح
3. اختبر من لوحة تحكم Stripe

---

## الخطوات التالية

✅ تم إعداد GitHub و Render بنجاح!

الآن يمكنك:

1. **تطوير الميزات:** أضف ميزات جديدة وادفعها إلى GitHub
2. **الاختبار:** اختبر الموقع على `pixelreel.studio`
3. **المراقبة:** راقب الأداء والأخطاء في Render
4. **التحديثات:** كل دفع إلى `main` سينشر تلقائياً

---

## روابط مفيدة

- 📚 [توثيق Render](https://render.com/docs)
- 📚 [توثيق GitHub](https://docs.github.com)
- 🔐 [توثيق Supabase](https://supabase.com/docs)
- 💳 [توثيق Stripe](https://stripe.com/docs)

---

**هل تحتاج إلى مساعدة؟** تواصل معنا عبر:
- 📧 البريد: ayman@pixelreel.studio
- 💬 WhatsApp: +971 58 825 9848
- 📱 Telegram: @pixelreel
