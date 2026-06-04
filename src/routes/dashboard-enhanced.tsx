import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { useAuth, signOut } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { createPortalSession } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe-client";
import { toast } from "sonner";
import { LogOut, Package, CreditCard, ShieldCheck, ArrowRight, Settings, TrendingUp, Download, Eye } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/dashboard-enhanced")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Pixel & Reel" },
      { name: "description", content: "Manage your account, view orders, track subscriptions, and analytics." },
      { name: "robots", content: "noindex" },
    ],
    links: [
      { rel: "canonical", href: "https://www.pixelreel.studio/dashboard" },
    ],
  }),
  component: EnhancedDashboardPage,
});

function EnhancedDashboardPage() {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    
    // جلب الطلبات والاشتراكات
    Promise.all([
      supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]).then(([ordersRes, subsRes]) => {
      setOrders(ordersRes.data || []);
      setSubs(subsRes.data || []);
      
      // حساب الإحصائيات
      const totalSpent = (ordersRes.data || []).reduce((a, o) => a + (o.amount_cents || 0), 0) / 100;
      const activeSubscriptions = (subsRes.data || []).filter(s => s.status === "active").length;
      const completedOrders = (ordersRes.data || []).filter(o => o.status === "completed").length;
      
      setAnalytics({
        totalSpent,
        activeSubscriptions,
        completedOrders,
        totalOrders: ordersRes.data?.length || 0,
      });
      
      // بيانات الرسم البياني (آخر 7 أيام)
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dayOrders = (ordersRes.data || []).filter(o => {
          const oDate = new Date(o.created_at);
          return oDate.toDateString() === date.toDateString();
        });
        return {
          date: date.toLocaleDateString("ar-SA", { month: "short", day: "numeric" }),
          amount: dayOrders.reduce((a, o) => a + (o.amount_cents || 0), 0) / 100,
          count: dayOrders.length,
        };
      });
      setChartData(last7Days);
    });
  }, [user]);

  if (!user) return null;

  const COLORS = ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">
        {/* رأس الصفحة */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">{lang === "ar" ? "لوحة التحكم" : "Dashboard"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-2 text-sm font-bold text-black">
                <ShieldCheck className="h-4 w-4" /> {lang === "ar" ? "الإدارة" : "Admin"}
              </Link>
            )}
            <button onClick={() => { signOut(); navigate({ to: "/" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent">
              <LogOut className="h-4 w-4" /> {lang === "ar" ? "خروج" : "Sign out"}
            </button>
          </div>
        </div>

        {/* الإحصائيات الرئيسية */}
        {analytics && (
          <div className="grid gap-4 sm:grid-cols-4 mb-8">
            <StatCard 
              label={lang === "ar" ? "إجمالي الإنفاق" : "Total Spent"} 
              value={`$${analytics.totalSpent.toFixed(2)}`}
              icon={<CreditCard className="h-5 w-5" />}
              color="bg-pink-500/10"
            />
            <StatCard 
              label={lang === "ar" ? "الطلبات" : "Orders"} 
              value={analytics.totalOrders}
              icon={<Package className="h-5 w-5" />}
              color="bg-blue-500/10"
            />
            <StatCard 
              label={lang === "ar" ? "الاشتراكات النشطة" : "Active Subs"} 
              value={analytics.activeSubscriptions}
              icon={<TrendingUp className="h-5 w-5" />}
              color="bg-green-500/10"
            />
            <StatCard 
              label={lang === "ar" ? "المكتملة" : "Completed"} 
              value={analytics.completedOrders}
              icon={<Eye className="h-5 w-5" />}
              color="bg-purple-500/10"
            />
          </div>
        )}

        {/* الرسوم البيانية */}
        {chartData.length > 0 && (
          <div className="grid gap-6 mb-8 lg:grid-cols-2">
            {/* رسم بياني خطي للإنفاق */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-bold">{lang === "ar" ? "الإنفاق (آخر 7 أيام)" : "Spending (Last 7 Days)"}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#ec4899" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* رسم بياني عمودي لعدد الطلبات */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-bold">{lang === "ar" ? "عدد الطلبات" : "Order Count"}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* الاشتراكات */}
        <Section title={lang === "ar" ? "اشتراكاتي" : "My Subscriptions"}>
          {subs.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد اشتراكات" : "No subscriptions yet"} />
            : <>
                {subs.map((s) => (
                  <Row key={s.id} title={s.price_id} sub={s.status} extra={s.current_period_end ? new Date(s.current_period_end).toLocaleDateString() : ""} />
                ))}
                <ManagePortalButton />
              </>}
        </Section>

        {/* الطلبات */}
        <Section title={lang === "ar" ? "طلباتي" : "My Orders"}>
          {orders.length === 0 ? <Empty msg={lang === "ar" ? "لا توجد طلبات بعد" : "No orders yet"} />
            : <div className="space-y-2">
                {orders.slice(0, 5).map((o) => (
                  <Row key={o.id} title={o.service_summary || o.price_id} sub={`${(o.amount_cents/100).toFixed(2)} ${o.currency?.toUpperCase()}`} extra={o.status} />
                ))}
                {orders.length > 5 && (
                  <Link to="/orders" className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                    {lang === "ar" ? "عرض الكل" : "View all"} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>}
        </Section>

        <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          {lang === "ar" ? "تصفّح الخدمات" : "Browse services"} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: any; icon: React.ReactNode; color: string }) {
  return (
    <div className={`rounded-2xl border border-border ${color} p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-bold">{value}</div>
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({ title, sub, extra }: { title: string; sub: string; extra?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-4">
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
      {extra && <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold">{extra}</span>}
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return <div className="rounded-xl border border-dashed border-border bg-card/50 p-6 text-center text-sm text-muted-foreground">{msg}</div>;
}

function ManagePortalButton() {
  const { lang } = useI18n();
  const [busy, setBusy] = useState(false);
  const portal = useServerFn(createPortalSession);
  async function open() {
    setBusy(true);
    try {
      const res = await portal({
        data: {
          environment: getStripeEnvironment(),
          returnUrl: `${window.location.origin}/dashboard`,
        },
      });
      if ("error" in res) throw new Error(res.error);
      window.open(res.url, "_blank");
    } catch (e: any) {
      toast.error(e.message || "Failed to open portal");
    } finally {
      setBusy(false);
    }
  }
  return (
    <button onClick={open} disabled={busy}
      className="mt-2 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-accent disabled:opacity-50">
      <Settings className="h-4 w-4" /> {lang === "ar" ? "إدارة الاشتراك" : "Manage subscription"}
    </button>
  );
}
