# 🌐 دليل إعداد الدومين

هذا الدليل يشرح كيفية ربط دومينك الخاص بـ Render والموقع.

---

## المرحلة الأولى: شراء الدومين

### الخيار 1: Namecheap (موصى به)

1. انتقل إلى https://www.namecheap.com
2. ابحث عن الدومين الذي تريده (مثلاً `pixelreel.studio`)
3. أضفه إلى السلة واتبع عملية الشراء
4. اختر "Namecheap BasicDNS" (مجاني)

### الخيار 2: GoDaddy

1. انتقل إلى https://www.godaddy.com
2. ابحث عن الدومين
3. أكمل عملية الشراء

### الخيار 3: Google Domains

1. انتقل إلى https://domains.google
2. ابحث عن الدومين
3. أكمل عملية الشراء

---

## المرحلة الثانية: ربط الدومين بـ Render

### الخطوة 1: الحصول على معلومات الـ DNS من Render

1. انتقل إلى https://dashboard.render.com
2. اختر خدمتك `pixel-reel`
3. اذهب إلى **Settings**
4. ابحث عن **Custom Domain**
5. أضف دومينك (مثلاً `pixelreel.studio`)
6. اضغط **Add**

Render سيعطيك معلومات مثل:
```
Type: CNAME
Name: pixelreel.studio
Value: pixel-reel.onrender.com
```

### الخطوة 2: تحديث سجلات DNS

#### إذا كنت تستخدم Namecheap:

1. انتقل إلى https://www.namecheap.com/dashboard
2. اختر **Domain List**
3. اضغط على **Manage** بجانب دومينك
4. اذهب إلى **Advanced DNS**
5. ابحث عن سجل **CNAME** الموجود
6. عدّله أو أضف سجل جديد:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | @ | pixel-reel.onrender.com | 3600 |

أو للـ www:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | pixel-reel.onrender.com | 3600 |

#### إذا كنت تستخدم GoDaddy:

1. انتقل إلى https://www.godaddy.com/dashboard
2. اختر **Domains**
3. اختر دومينك
4. اذهب إلى **DNS**
5. ابحث عن سجل **CNAME**
6. عدّله:

| Name | Type | Value |
|------|------|-------|
| @ | CNAME | pixel-reel.onrender.com |

#### إذا كنت تستخدم Google Domains:

1. انتقل إلى https://domains.google
2. اختر دومينك
3. اذهب إلى **DNS**
4. ابحث عن **Custom Records**
5. أضف سجل CNAME جديد:

| Name | Type | TTL | Data |
|------|------|-----|------|
| @ | CNAME | 3600 | pixel-reel.onrender.com |

---

## المرحلة الثالثة: التحقق من الربط

### الخطوة 1: انتظر تحديث DNS

تحديث سجلات DNS قد يستغرق من 24 إلى 48 ساعة. يمكنك التحقق من التقدم:

1. افتح Terminal/Command Prompt
2. اكتب:
```bash
nslookup pixelreel.studio
```

3. ابحث عن السطر الذي يحتوي على `pixel-reel.onrender.com`

### الخطوة 2: اختبر الموقع

بعد تحديث DNS:

1. افتح متصفحك
2. انتقل إلى `https://pixelreel.studio`
3. تحقق من أن الموقع يعمل بشكل صحيح

### الخطوة 3: تفعيل SSL

Render يوفر شهادة SSL مجانية تلقائياً. للتحقق:

1. في Render، اذهب إلى **Settings**
2. ابحث عن **SSL Certificate**
3. يجب أن يظهر "Active"

---

## المرحلة الرابعة: الإعدادات الإضافية

### إعادة التوجيه من www

إذا أردت أن يعيد التوجيه من `www.pixelreel.studio` إلى `pixelreel.studio`:

#### في Namecheap:

1. اذهب إلى **Advanced DNS**
2. أضف سجل جديد:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | pixelreel.studio | 3600 |

#### في GoDaddy:

1. اذهب إلى **DNS**
2. أضف سجل جديد:

| Name | Type | Value |
|------|------|-------|
| www | CNAME | pixelreel.studio |

### تفعيل HTTPS

يجب أن يكون HTTPS مفعلاً تلقائياً. للتحقق:

1. انتقل إلى `https://pixelreel.studio` (لاحظ الـ https)
2. يجب أن ترى قفل أخضر في المتصفح

---

## استكشاف الأخطاء

### ❌ الخطأ: "DNS not resolving"

**الحل:**
1. انتظر 24-48 ساعة
2. امسح ذاكرة التخزين المؤقت للمتصفح
3. جرب من متصفح مختلف

### ❌ الخطأ: "SSL certificate error"

**الحل:**
1. انتظر بضع دقائق
2. امسح ذاكرة التخزين المؤقت
3. تحقق من أن الدومين مضاف بشكل صحيح في Render

### ❌ الخطأ: "Page not found"

**الحل:**
1. تحقق من أن Render يعمل بشكل صحيح
2. تحقق من أن الكود مرفوع على GitHub
3. تحقق من سجلات Render للأخطاء

### ❌ الخطأ: "Connection refused"

**الحل:**
1. تحقق من أن الخدمة تعمل في Render
2. تحقق من متغيرات البيئة
3. أعد تشغيل الخدمة في Render

---

## الخطوات التالية

✅ تم ربط الدومين بنجاح!

الآن يمكنك:

1. **استخدام الدومين الخاص بك:** `https://pixelreel.studio`
2. **إضافة بريد إلكتروني:** `info@pixelreel.studio`
3. **تحسين SEO:** استخدام الدومين في جميع الروابط
4. **مشاركة الموقع:** أخبر الآخرين عن موقعك الجديد

---

## روابط مفيدة

- 🔧 [توثيق Render - Custom Domains](https://render.com/docs/custom-domains)
- 🔍 [أداة فحص DNS](https://mxtoolbox.com)
- 📧 [إعداد البريد الإلكتروني للدومين](https://support.google.com/a/answer/54693)

---

## نصائح مهمة

1. **لا تحذف السجلات القديمة:** احتفظ بسجلات DNS الموجودة
2. **استخدم TTL منخفض:** أثناء التحديث (3600 أو أقل)
3. **تحقق من الإملاء:** تأكد من كتابة الدومين بشكل صحيح
4. **احفظ كلمات المرور:** احفظ كلمات مرور لوحات تحكم الدومين

---

**هل تحتاج إلى مساعدة؟** تواصل معنا:
- 📧 البريد: ayman@pixelreel.studio
- 💬 WhatsApp: +971 58 825 9848
- 📱 Telegram: @pixelreel

---

**آخر تحديث:** يونيو 2026
