import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

/**
 * نظام أتمتة البريد الإلكتروني
 * يرسل رسائل تلقائية عند أحداث معينة
 */

export const sendWelcomeEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      name: z.string().min(1).max(100),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const subject = data.language === "ar" 
        ? "مرحباً بك في بكسل آند ريل 🎨" 
        : "Welcome to Pixel & Reel 🎨";
      
      const html = data.language === "ar"
        ? `<h1>مرحباً ${data.name}!</h1><p>شكراً لانضمامك إلينا. لديك 5 رصيد مجاني للبدء.</p>`
        : `<h1>Welcome ${data.name}!</h1><p>Thanks for joining us. You have 5 free credits to get started.</p>`;

      // إرسال البريد عبر Lovable Email API
      const response = await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": process.env.LOVABLE_API_KEY || "",
        },
        body: JSON.stringify({
          to: data.email,
          subject,
          html,
          from: "noreply@pixelreel.studio",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send welcome email");
      }

      return { success: true, message: "Welcome email sent" };
    } catch (error) {
      console.error("Welcome email error:", error);
      return { success: false, error: String(error) };
    }
  });

export const sendOrderConfirmation = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      orderId: z.string().uuid(),
      amount: z.number().positive(),
      currency: z.string().default("AED"),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const subject = data.language === "ar"
        ? `تأكيد الطلب #${data.orderId.slice(0, 8)}`
        : `Order Confirmation #${data.orderId.slice(0, 8)}`;

      const html = data.language === "ar"
        ? `<h1>تم استلام طلبك ✅</h1><p>رقم الطلب: ${data.orderId.slice(0, 8)}</p><p>المبلغ: ${data.amount} ${data.currency}</p><p>سيتم معالجة طلبك قريباً.</p>`
        : `<h1>Order Received ✅</h1><p>Order ID: ${data.orderId.slice(0, 8)}</p><p>Amount: ${data.amount} ${data.currency}</p><p>Your order will be processed shortly.</p>`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": process.env.LOVABLE_API_KEY || "",
        },
        body: JSON.stringify({
          to: data.email,
          subject,
          html,
          from: "orders@pixelreel.studio",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send order confirmation");
      }

      return { success: true, message: "Order confirmation sent" };
    } catch (error) {
      console.error("Order confirmation error:", error);
      return { success: false, error: String(error) };
    }
  });

export const sendSubscriptionAlert = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      planName: z.string(),
      renewalDate: z.string(),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const subject = data.language === "ar"
        ? `تذكير: اشتراكك ${data.planName} سينتهي قريباً`
        : `Reminder: Your ${data.planName} subscription is ending soon`;

      const html = data.language === "ar"
        ? `<h1>تنبيه الاشتراك 📢</h1><p>اشتراكك في ${data.planName} سينتهي في ${data.renewalDate}</p><p>لتجديد الاشتراك، قم بزيارة حسابك.</p>`
        : `<h1>Subscription Alert 📢</h1><p>Your ${data.planName} subscription will end on ${data.renewalDate}</p><p>Visit your account to renew.</p>`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": process.env.LOVABLE_API_KEY || "",
        },
        body: JSON.stringify({
          to: data.email,
          subject,
          html,
          from: "subscriptions@pixelreel.studio",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send subscription alert");
      }

      return { success: true, message: "Subscription alert sent" };
    } catch (error) {
      console.error("Subscription alert error:", error);
      return { success: false, error: String(error) };
    }
  });

/**
 * إرسال بريد إلى جميع المستخدمين (للإدارة)
 */
export const sendBulkEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      subject: z.string().min(1).max(200),
      html: z.string().min(1),
      recipientGroup: z.enum(["all", "active_subscribers", "inactive"]).default("all"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      // جلب المستخدمين حسب المجموعة
      let query = supabase.from("profiles").select("user_id");
      
      if (data.recipientGroup === "active_subscribers") {
        // فقط المستخدمون الذين لديهم اشتراكات نشطة
        const { data: activeSubs } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("status", "active");
        
        const userIds = activeSubs?.map(s => s.user_id) || [];
        if (userIds.length === 0) return { success: true, sent: 0 };
        
        query = query.in("user_id", userIds);
      }

      const { data: profiles } = await query;
      if (!profiles || profiles.length === 0) {
        return { success: true, sent: 0 };
      }

      // إرسال البريد لكل مستخدم
      let sent = 0;
      for (const profile of profiles) {
        try {
          const { data: authUser } = await supabase.auth.admin.getUserById(profile.user_id);
          if (authUser?.user?.email) {
            await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Lovable-API-Key": process.env.LOVABLE_API_KEY || "",
              },
              body: JSON.stringify({
                to: authUser.user.email,
                subject: data.subject,
                html: data.html,
                from: "admin@pixelreel.studio",
              }),
            });
            sent++;
          }
        } catch (err) {
          console.error("Error sending to user:", err);
        }
      }

      return { success: true, sent };
    } catch (error) {
      console.error("Bulk email error:", error);
      return { success: false, error: String(error) };
    }
  });
