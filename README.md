# 🎨 Pixel & Reel - منصة الخدمات الإبداعية

منصة ويب احترافية لتقديم الخدمات الإبداعية والتصميمية مع نظام دفع متكامل وأتمتة ذكية.

## ✨ الميزات الرئيسية

### 🎯 إدارة الخدمات
- عرض احترافي للخدمات المختلفة (تصميم، فيديو، موشن جرافيك، إلخ)
- نظام الخطط والباقات (Starter, Pro, Studio)
- إضافات اختيارية (Add-ons)
- نظام الخصومات والعروض الترويجية

### 💳 نظام الدفع المتكامل
- دمج Stripe للدفع الآمن
- دعم الدفعات لمرة واحدة والاشتراكات المتكررة
- إدارة الفواتير والاشتراكات
- لوحة تحكم للعملاء لإدارة اشتراكاتهم

### 🤖 ميزات الذكاء الاصطناعي
- توليد صور احترافية للمنشورات
- كتابة نصوص إعلانية بلغات متعددة
- مساعد ذكي لاختيار الخدمات المناسبة
- توليد أفكار إبداعية للحملات

### 📊 لوحة التحكم المتقدمة
- إحصائيات حية للمبيعات والطلبات
- رسوم بيانية تفاعلية
- تتبع الاشتراكات النشطة
- تحليل الإنفاق والإيرادات

### 📧 نظام الأتمتة
- رسائل ترحيب تلقائية
- تأكيدات الطلبات الفورية
- تنبيهات تجديد الاشتراكات
- حملات بريدية موجهة

### 🌍 دعم اللغات
- واجهة ثنائية اللغة (العربية والإنجليزية)
- محتوى مخصص لكل لغة
- دعم اتجاهات النصوص المختلفة

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 19** - مكتبة واجهات المستخدم
- **TanStack Router** - نظام التوجيه الحديث
- **TanStack Start** - إطار عمل متقدم
- **Tailwind CSS** - تصميم استجابي
- **Radix UI** - مكونات واجهة جاهزة
- **Recharts** - رسوم بيانية تفاعلية

### Backend
- **Node.js** - خادم التطبيق
- **Vite** - أداة البناء السريعة
- **TypeScript** - لغة برمجة آمنة

### الخدمات الخارجية
- **Supabase** - قاعدة البيانات والمصادقة
- **Stripe** - نظام الدفع
- **Lovable API** - الذكاء الاصطناعي وتوليد الصور

## 📦 المتطلبات

- Node.js 18+
- npm أو yarn
- حساب Supabase
- مفاتيح Stripe (Sandbox و Live)
- مفتاح Lovable API

## 🚀 البدء السريع

### 1. استنساخ المستودع

```bash
git clone https://github.com/YOUR_USERNAME/pixel-reel.git
cd pixel-reel
```

### 2. تثبيت المكتبات

```bash
npm install --legacy-peer-deps
```

### 3. إعداد متغيرات البيئة

أنشئ ملف `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SANDBOX_API_KEY=your_stripe_key
LOVABLE_API_KEY=your_lovable_key
```

### 4. تشغيل خادم التطوير

```bash
npm run dev
```

الموقع سيكون متاحاً على `http://localhost:5173`

## 📁 هيكل المشروع

```
pixel-reel/
├── src/
│   ├── components/       # مكونات React
│   ├── routes/          # صفحات التطبيق
│   ├── lib/             # دوال مساعدة وأتمتة
│   ├── integrations/    # تكاملات خارجية
│   ├── hooks/           # React hooks مخصصة
│   └── styles/          # أنماط CSS
├── supabase/
│   └── migrations/      # ترحيلات قاعدة البيانات
├── public/              # ملفات ثابتة
└── package.json         # المكتبات والسكريبتات
```

## 🔧 الأوامر المتاحة

```bash
# تشغيل خادم التطوير
npm run dev

# بناء للإنتاج
npm run build

# معاينة الإنتاج محلياً
npm run preview

# فحص الأخطاء
npm run lint

# تنسيق الكود
npm run format
```

## 📚 الصفحات الرئيسية

- `/` - الصفحة الرئيسية
- `/auth` - تسجيل الدخول والتسجيل
- `/dashboard` - لوحة التحكم
- `/dashboard-enhanced` - لوحة التحكم المتقدمة
- `/design` - استوديو الذكاء الاصطناعي
- `/portfolio` - معرض الأعمال
- `/admin` - لوحة الإدارة

## 🔐 الأمان

- مصادقة آمنة عبر Supabase
- سياسات Row Level Security (RLS)
- تشفير البيانات الحساسة
- التحقق من توقيع Stripe webhooks

## 📊 قاعدة البيانات

### الجداول الرئيسية

- **profiles** - بيانات المستخدمين
- **orders** - الطلبات والمشتريات
- **subscriptions** - الاشتراكات المتكررة
- **leads** - جهات الاتصال
- **portfolio_items** - أعمال العرض
- **email_send_log** - سجل الرسائل المرسلة

## 🌐 النشر

انظر [DEPLOYMENT.md](./DEPLOYMENT.md) لتعليمات النشر على Render وربط الدومين.

## 🐛 استكشاف الأخطاء

### خطأ: "Supabase connection failed"
- تحقق من `SUPABASE_URL` و `SUPABASE_PUBLISHABLE_KEY`
- تأكد من أن مشروع Supabase نشط

### خطأ: "Stripe error"
- تحقق من مفاتيح Stripe
- تأكد من استخدام مفاتيح Sandbox للاختبار

### خطأ: "AI generation failed"
- تحقق من `LOVABLE_API_KEY`
- تأكد من أن الحد الأقصى للطلبات لم يُتجاوز

## 📞 الدعم والتواصل

- **WhatsApp:** [تواصل عبر WhatsApp](https://wa.me/971588259848)
- **Telegram:** [@pixelreel](https://t.me/pixelreel)
- **البريد الإلكتروني:** ayman@pixelreel.studio

## 📄 الترخيص

هذا المشروع مرخص تحت MIT License. انظر [LICENSE](./LICENSE) للتفاصيل.

## 🙏 شكر خاص

- **Ayman Mahrous** - المؤسس والمطور الرئيسي
- **Lovable** - منصة الذكاء الاصطناعي
- **Stripe** - نظام الدفع
- **Supabase** - قاعدة البيانات

---

**آخر تحديث:** يونيو 2026
**الإصدار:** 1.0.0