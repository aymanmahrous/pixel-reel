import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";

function key() {
  const k = process.env.LOVABLE_API_KEY;
  if (!k) throw new Error("LOVABLE_API_KEY missing");
  return k;
}

/**
 * مساعد ذكي لاختيار الخدمة المناسبة
 */
export const getServiceRecommendation = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      userBrief: z.string().min(10).max(500),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const systemPrompt = data.language === "ar"
        ? "أنت مستشار متخصص في الخدمات الإبداعية. حلل احتياجات العميل وأوصِ بأفضل الخدمات من: منشورات السوشيال ميديا، الشعار والهوية البصرية، تحرير الفيديو، الموشن جرافيك، الحملات الإعلانية، تصوير المنتجات، الطباعة والتغليف، إدارة السوشيال ميديا. أرجع JSON فقط."
        : "You are a creative services consultant. Analyze customer needs and recommend the best services from: Social Media Posts, Logo & Brand Identity, Video Editing, Motion Graphics, Ad Campaigns, Product Photography, Print & Packaging, Social Media Management. Return JSON only.";

      const res = await fetch(`${GATEWAY}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key(),
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: data.userBrief,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Recommendation failed [${res.status}]`);
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content ?? "{}";
      
      try {
        return JSON.parse(content);
      } catch {
        return { recommendation: content };
      }
    } catch (error) {
      console.error("Service recommendation error:", error);
      return { error: String(error) };
    }
  });

/**
 * توليد وصف احترافي للمشروع
 */
export const generateProjectDescription = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      projectName: z.string().min(1).max(100),
      projectType: z.string().min(1).max(50),
      clientBrief: z.string().min(10).max(500),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const systemPrompt = data.language === "ar"
        ? "أنت كاتب محتوى متخصص في الخدمات الإبداعية. اكتب وصفاً احترافياً وجذاباً للمشروع (3-4 جمل). أرجع JSON: {\"description\": \"...\", \"highlights\": [...]}"
        : "You are a creative content writer. Write a professional and engaging project description (3-4 sentences). Return JSON: {\"description\": \"...\", \"highlights\": [...]}";

      const res = await fetch(`${GATEWAY}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key(),
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Project: ${data.projectName}\nType: ${data.projectType}\nBrief: ${data.clientBrief}`,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Description generation failed [${res.status}]`);
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content ?? "{}";
      
      try {
        return JSON.parse(content);
      } catch {
        return { description: content };
      }
    } catch (error) {
      console.error("Description generation error:", error);
      return { error: String(error) };
    }
  });

/**
 * توليد أفكار إبداعية للحملات
 */
export const generateCampaignIdeas = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      industry: z.string().min(1).max(50),
      targetAudience: z.string().min(1).max(100),
      budget: z.enum(["low", "medium", "high"]).default("medium"),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const systemPrompt = data.language === "ar"
        ? "أنت مستشار تسويق إبداعي. قدم 3 أفكار حملات إبداعية وفعالة. أرجع JSON: {\"ideas\": [{\"title\": \"...\", \"description\": \"...\", \"channels\": [...]}]}"
        : "You are a creative marketing consultant. Provide 3 creative and effective campaign ideas. Return JSON: {\"ideas\": [{\"title\": \"...\", \"description\": \"...\", \"channels\": [...]}]}";

      const res = await fetch(`${GATEWAY}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key(),
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Industry: ${data.industry}\nTarget Audience: ${data.targetAudience}\nBudget: ${data.budget}`,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Campaign ideas generation failed [${res.status}]`);
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content ?? "{}";
      
      try {
        return JSON.parse(content);
      } catch {
        return { ideas: [{ title: "Campaign Idea", description: content }] };
      }
    } catch (error) {
      console.error("Campaign ideas error:", error);
      return { error: String(error) };
    }
  });

/**
 * تحليل المشهد التنافسي
 */
export const analyzeCompetition = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      industry: z.string().min(1).max(50),
      businessType: z.string().min(1).max(100),
      language: z.enum(["en", "ar"]).default("en"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const systemPrompt = data.language === "ar"
        ? "أنت محلل أسواق متخصص. قدم تحليلاً للمشهد التنافسي والفرص. أرجع JSON: {\"strengths\": [...], \"opportunities\": [...], \"threats\": [...], \"recommendations\": [...]}"
        : "You are a market analyst. Provide competitive landscape analysis and opportunities. Return JSON: {\"strengths\": [...], \"opportunities\": [...], \"threats\": [...], \"recommendations\": [...]}";

      const res = await fetch(`${GATEWAY}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key(),
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Industry: ${data.industry}\nBusiness Type: ${data.businessType}`,
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(`Competition analysis failed [${res.status}]`);
      }

      const json = await res.json();
      const content = json?.choices?.[0]?.message?.content ?? "{}";
      
      try {
        return JSON.parse(content);
      } catch {
        return { analysis: content };
      }
    } catch (error) {
      console.error("Competition analysis error:", error);
      return { error: String(error) };
    }
  });
