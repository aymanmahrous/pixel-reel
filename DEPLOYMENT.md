# دليل النشر - Pixel & Reel

## المتطلبات الأساسية

- حساب GitHub
- حساب Render
- حساب Supabase (موجود بالفعل)
- مفاتيح Stripe (Sandbox و Live)
- مفتاح Lovable API

## خطوات النشر على GitHub

### 1. إنشاء مستودع جديد على GitHub

```bash
# انتقل إلى https://github.com/new
# أنشئ مستودع جديد باسم "pixel-reel"
# اختر "Private" للخصوصية
```

### 2. رفع الكود

```bash
cd ~/pixel-reel-project

# أضف المستودع البعيد
git remote add origin https://github.com/YOUR_USERNAME/pixel-reel.git

# غيّر اسم الفرع إلى main (اختياري)
git branch -M main

# ادفع الكود
git push -u origin main
```

## خطوات النشر على Render

### 1. إنشاء خدمة جديدة على Render

1. انتقل إلى https://dashboard.render.com
2. اضغط على "New +" ثم اختر "Web Service"
3. اختر "Connect a repository" وربط مستودع GitHub الخاص بك
4. اختر الفرع `main`

### 2. إعدادات الخدمة

**الاسم:** `pixel-reel`
**المنطقة:** اختر الأقرب إليك (مثلاً `Frankfurt` لأوروبا)
**الفرع:** `main`
**الأمر البناء:**
```bash
npm install --legacy-peer-deps && npm run build
```

**أمر البدء:**
```bash
npm run preview
```

### 3. متغيرات البيئة (Environment Variables)

أضف المتغيرات التالية في إعدادات Render:

```
# Supabase
VITE_SUPABASE_URL=https://dwdywurpcebxznqzmgch.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZHl3dXJwY2VieHpucXptZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzgzMDEsImV4cCI6MjA5NjAxNDMwMX0.F0n_H96cUwhoFfC0sfgH2ZYGeyjkJZntwchEfIJs4Nw
SUPABASE_URL=https://dwdywurpcebxznqzmgch.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZHl3dXJwY2VieHpucXptZ2NoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MzgzMDEsImV4cCI6MjA5NjAxNDMwMX0.F0n_H96cUwhoFfC0sfgH2ZYGeyjkJZntwchEfIJs4Nw

# Stripe (استخدم مفاتيح Sandbox للاختبار)
STRIPE_SANDBOX_API_KEY=sk_test_YOUR_KEY
STRIPE_LIVE_API_KEY=sk_live_YOUR_KEY
PAYMENTS_SANDBOX_WEBHOOK_SECRET=whsec_test_YOUR_SECRET
PAYMENTS_LIVE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# Lovable API
LOVABLE_API_KEY=YOUR_LOVABLE_API_KEY

# Supabase Service Role (للعمليات الخلفية)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### 4. ربط الدومين

1. في لوحة تحكم Render، اذهب إلى "Settings"
2. ابحث عن "Custom Domain"
3. أضف دومينك (مثلاً `pixelreel.studio`)
4. اتبع التعليمات لتحديث سجلات DNS

## متغيرات البيئة المطلوبة

### في Render:

```env
# Frontend
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

# Backend
SUPABASE_URL=
SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SANDBOX_API_KEY=
STRIPE_LIVE_API_KEY=
PAYMENTS_SANDBOX_WEBHOOK_SECRET=
PAYMENTS_LIVE_WEBHOOK_SECRET=

# Lovable
LOVABLE_API_KEY=
LOVABLE_SEND_URL=https://api.lovable.dev/email/send

# Node
NODE_ENV=production
```

## التحقق من النشر

بعد النشر على Render:

1. تحقق من أن الموقع يعمل: `https://pixel-reel.onrender.com`
2. اختبر صفحة المصادقة: `/auth`
3. اختبر لوحة التحكم: `/dashboard`
4. تحقق من سجلات الخوادم في Render للأخطاء

## إعادة النشر التلقائي

Render سينشر تلقائياً عند كل دفع إلى الفرع `main`. لتعطيل هذا:

1. اذهب إلى "Settings" في Render
2. ابحث عن "Auto-Deploy"
3. اختر "Off" إذا أردت النشر اليدوي

## استكشاف الأخطاء

### خطأ: "npm install failed"
- تأكد من أن `package.json` موجود
- جرب `npm install --legacy-peer-deps`

### خطأ: "Build failed"
- تحقق من متغيرات البيئة
- تأكد من أن جميع المكتبات مثبتة

### خطأ: "Database connection failed"
- تحقق من `SUPABASE_URL` و `SUPABASE_SERVICE_ROLE_KEY`
- تأكد من أن الجداول موجودة في Supabase

## الخطوات التالية

1. **اختبر الموقع:** تأكد من أن جميع الميزات تعمل
2. **ربط الدومين:** استخدم دومينك الخاص بدلاً من `onrender.com`
3. **إعداد SSL:** Render يوفر شهادة SSL مجانية تلقائياً
4. **مراقبة الأداء:** استخدم لوحة تحكم Render لمراقبة الأداء والأخطاء

---

**ملاحظة:** احفظ جميع مفاتيح API والبيانات الحساسة في مكان آمن. لا تشاركها في المستودع العام.
