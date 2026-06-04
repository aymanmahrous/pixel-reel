# 🔧 دليل الصيانة والتحديثات

هذا الدليل يشرح كيفية صيانة الموقع وتحديثه بشكل آمن.

---

## المراقبة اليومية

### 1. فحص الموقع

كل يوم، تحقق من:

```bash
# اختبر الصفحة الرئيسية
curl -I https://pixelreel.studio

# اختبر صفحة المصادقة
curl -I https://pixelreel.studio/auth

# اختبر لوحة التحكم
curl -I https://pixelreel.studio/dashboard
```

### 2. مراقبة الأخطاء

في Render:

1. اذهب إلى لوحة التحكم
2. اختر خدمتك `pixel-reel`
3. اذهب إلى **Logs**
4. ابحث عن أي أخطاء حمراء

### 3. فحص قاعدة البيانات

في Supabase:

1. اذهب إلى https://supabase.com/dashboard
2. اختر مشروعك
3. اذهب إلى **SQL Editor**
4. قم بتشغيل الاستعلام:

```sql
-- عدد المستخدمين النشطين
SELECT COUNT(*) FROM profiles WHERE created_at > now() - interval '7 days';

-- الطلبات الجديدة
SELECT COUNT(*) FROM orders WHERE created_at > now() - interval '1 day';

-- الاشتراكات النشطة
SELECT COUNT(*) FROM subscriptions WHERE status = 'active';
```

---

## التحديثات الأسبوعية

### 1. تحديث المكتبات

```bash
# تحقق من التحديثات المتاحة
npm outdated

# حدّث المكتبات الآمنة
npm update

# اختبر الموقع محلياً
npm run dev

# ادفع التحديثات إلى GitHub
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push origin main
```

### 2. فحص الأمان

```bash
# ابحث عن الثغرات الأمنية
npm audit

# أصلح الثغرات التلقائية
npm audit fix

# إذا لم تنجح الإصلاحات التلقائية
npm audit fix --force
```

### 3. تنظيف قاعدة البيانات

```sql
-- احذف الطلبات المعلقة القديمة (أكثر من 30 يوم)
DELETE FROM orders 
WHERE status = 'pending' 
AND created_at < now() - interval '30 days';

-- احذف الرسائل المرسلة (أكثر من 90 يوم)
DELETE FROM email_send_log 
WHERE created_at < now() - interval '90 days';
```

---

## التحديثات الشهرية

### 1. مراجعة الأداء

في Render:

1. اذهب إلى **Metrics**
2. تحقق من:
   - استخدام CPU
   - استخدام الذاكرة
   - عدد الطلبات
   - أوقات الاستجابة

### 2. تحليل الإيرادات

في Stripe:

1. اذهب إلى https://dashboard.stripe.com
2. اذهب إلى **Payments**
3. تحقق من:
   - إجمالي الإيرادات
   - عدد المعاملات
   - معدل الفشل

### 3. تحليل المستخدمين

في Supabase:

```sql
-- أكثر الخدمات مبيعاً
SELECT price_id, COUNT(*) as count 
FROM orders 
WHERE created_at > now() - interval '30 days'
GROUP BY price_id 
ORDER BY count DESC;

-- المستخدمون الجدد
SELECT COUNT(*) FROM profiles 
WHERE created_at > now() - interval '30 days';

-- معدل الاحتفاظ
SELECT COUNT(*) FROM subscriptions 
WHERE status = 'active' 
AND created_at < now() - interval '30 days';
```

---

## إضافة ميزات جديدة

### 1. إنشاء فرع جديد

```bash
# أنشئ فرع جديد
git checkout -b feature/new-feature

# قم بالتطوير
# ... أضف الكود الجديد ...

# اختبر محلياً
npm run dev

# ادفع الفرع
git push origin feature/new-feature
```

### 2. إنشاء Pull Request

1. انتقل إلى GitHub
2. اضغط على **Pull Requests**
3. اضغط على **New Pull Request**
4. اختر الفرع الجديد
5. اكتب وصف التغييرات
6. اضغط **Create Pull Request**

### 3. دمج التغييرات

بعد المراجعة:

1. اضغط **Merge Pull Request**
2. اختر **Squash and merge** (موصى به)
3. اضغط **Confirm**

Render سينشر التحديثات تلقائياً!

---

## إصلاح الأخطاء

### خطأ في الإنتاج

#### الخطوة 1: تحديد المشكلة

```bash
# افحص السجلات في Render
# أو قم بتشغيل الموقع محلياً
npm run dev
```

#### الخطوة 2: إنشاء فرع للإصلاح

```bash
git checkout -b hotfix/bug-name
# أصلح الخطأ
git commit -m "fix: describe the bug fix"
git push origin hotfix/bug-name
```

#### الخطوة 3: دمج الإصلاح

1. أنشئ Pull Request
2. ادمج إلى `main`
3. Render سينشر الإصلاح تلقائياً

---

## النسخ الاحتياطية

### 1. نسخ احتياطية من Supabase

Supabase يوفر نسخ احتياطية تلقائية يومية.

للنسخ الاحتياطية اليدوية:

```bash
# صدّر قاعدة البيانات
pg_dump postgresql://user:password@host/dbname > backup.sql

# استورد قاعدة البيانات
psql postgresql://user:password@host/dbname < backup.sql
```

### 2. نسخ احتياطية من GitHub

```bash
# انسخ المستودع
git clone --mirror https://github.com/YOUR_USERNAME/pixel-reel.git
```

### 3. نسخ احتياطية من الملفات

```bash
# انسخ مجلد المشروع
cp -r ~/pixel-reel-project ~/backups/pixel-reel-$(date +%Y%m%d)
```

---

## الترقيات الكبيرة

### 1. ترقية React

```bash
# تحقق من الإصدار الحالي
npm list react

# حدّث إلى أحدث إصدار
npm install react@latest react-dom@latest

# اختبر
npm run dev

# ادفع التحديثات
git commit -m "upgrade: update react to latest version"
git push origin main
```

### 2. ترقية Node.js

1. تحقق من الإصدار الحالي: `node --version`
2. حمّل أحدث إصدار LTS
3. حدّث في Render:
   - اذهب إلى **Settings**
   - ابحث عن **Node Version**
   - غيّر الإصدار

### 3. ترقية Supabase

1. اذهب إلى https://supabase.com/dashboard
2. اختر مشروعك
3. اذهب إلى **Settings**
4. ابحث عن **Upgrade Plan** إذا لزم الأمر

---

## الأمان

### 1. تحديث كلمات المرور

كل 3 أشهر:

1. غيّر كلمة مرور Supabase
2. غيّر كلمة مرور GitHub
3. غيّر كلمة مرور Render
4. غيّر كلمة مرور Stripe

### 2. مراجعة الصلاحيات

```sql
-- تحقق من المستخدمين بصلاحيات إدارية
SELECT * FROM user_roles WHERE role = 'admin';

-- احذف الصلاحيات غير المستخدمة
DELETE FROM user_roles 
WHERE user_id NOT IN (SELECT user_id FROM profiles);
```

### 3. تفعيل المصادقة الثنائية

1. في GitHub: اذهب إلى **Settings** > **Security**
2. في Supabase: اذهب إلى **Settings** > **Auth**
3. في Stripe: اذهب إلى **Account** > **Security**

---

## الأداء

### 1. تحسين الصور

```bash
# استخدم أداة مثل ImageOptim أو TinyPNG
# لتقليل حجم الصور قبل الرفع
```

### 2. تخزين مؤقت (Caching)

في Render:

1. اذهب إلى **Settings**
2. ابحث عن **Cache**
3. فعّل التخزين المؤقت

### 3. CDN

استخدم Cloudflare:

1. انتقل إلى https://www.cloudflare.com
2. أضف دومينك
3. اتبع التعليمات

---

## الاختبار

### 1. اختبار الوحدة

```bash
# قم بإنشاء ملفات اختبار
npm install --save-dev vitest

# اكتب الاختبارات
# في ملفات .test.ts

# شغّل الاختبارات
npm run test
```

### 2. اختبار التكامل

```bash
# اختبر الواجهات البرمجية
npm install --save-dev supertest

# اكتب اختبارات التكامل
# شغّل الاختبارات
```

### 3. اختبار الأداء

```bash
# استخدم Lighthouse
# في متصفح Chrome: F12 > Lighthouse

# أو استخدم أداة أخرى
npm install --save-dev lighthouse
```

---

## التوثيق

### 1. تحديث README

عند إضافة ميزات جديدة:

1. حدّث `README.md`
2. أضف أمثلة الاستخدام
3. حدّث قسم الميزات

### 2. تحديث FEATURES.md

عند إضافة ميزات جديدة:

1. أضف وصف الميزة
2. أضف أمثلة الكود
3. اشرح الفوائد

### 3. تحديث السجل

أنشئ ملف `CHANGELOG.md`:

```markdown
# Changelog

## [1.1.0] - 2026-07-01
### Added
- نظام الإشعارات الفورية
- تحسينات الأداء

### Fixed
- خطأ في معالجة الدفع

## [1.0.0] - 2026-06-04
### Added
- الإطلاق الأول
```

---

## الخطوات التالية

✅ الصيانة المنتظمة تضمن:
- ✓ موقع آمن وسريع
- ✓ تجربة مستخدم ممتازة
- ✓ عدم وجود أخطاء
- ✓ أداء عالي

---

## روابط مفيدة

- 📚 [توثيق Render](https://render.com/docs)
- 📚 [توثيق Supabase](https://supabase.com/docs)
- 🔒 [نصائح الأمان](https://owasp.org/www-project-top-ten/)

---

**هل تحتاج إلى مساعدة؟** تواصل معنا:
- 📧 البريد: ayman@pixelreel.studio
- 💬 WhatsApp: +971 58 825 9848
- 📱 Telegram: @pixelreel

---

**آخر تحديث:** يونيو 2026
