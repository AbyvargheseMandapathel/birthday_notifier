"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cake, Play, Star, ChevronDown, CheckCircle2, ArrowRight, Bell, Gift, BarChart3, Settings, Users, Calendar, Home as HomeIcon } from "lucide-react";

/* ─── tiny reusable pieces for the mockup ────────────────────────── */
const Dot = ({ color }) => <span className={`w-2 h-2 rounded-full ${color}`} />;

const Avatar = ({ initials, bg = "bg-indigo-600" }) => (
  <div className={`w-8 h-8 ${bg} rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0`}>
    {initials}
  </div>
);

const MockStatCard = ({ value, label, sub, iconBg, icon }) => (
  <div className="bg-[#0d1220] rounded-2xl p-3 flex items-center gap-3 border border-slate-800/60">
    <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>{icon}</div>
    <div>
      <p className="text-lg font-black text-white leading-none">{value}</p>
      <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{label}</p>
      <p className="text-[7px] text-slate-500">{sub}</p>
    </div>
  </div>
);

/* ─── main page ──────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] overflow-hidden relative selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/8 dark:bg-indigo-600/15 rounded-full blur-[160px]" />
        <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[30%] h-[30%] bg-pink-600/5 dark:bg-pink-600/8 rounded-full blur-[120px]" />
      </div>

      {/* ──────────── NAVIGATION ──────────── */}
      <nav className="container mx-auto px-4 sm:px-6 py-5 sm:py-7 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-6 lg:gap-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Cake className="text-white" size={20} />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--foreground)]">BirthdayRemainder</span>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-[var(--text-muted)]">
            <Link href="#" className="hover:text-indigo-500 flex items-center gap-1 transition-colors">Features <ChevronDown size={13} /></Link>
            <Link href="#" className="hover:text-indigo-500 transition-colors">How It Works</Link>
            <Link href="#" className="hover:text-indigo-500 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-indigo-500 transition-colors">Blog</Link>
            <Link href="#" className="hover:text-indigo-500 transition-colors">Help</Link>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/login" className="hidden sm:inline text-[13px] font-semibold text-[var(--text-muted)] hover:text-indigo-500 transition-colors">Log in</Link>
          <Link href="/register" className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 text-white text-[12px] sm:text-[13px] font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25">Get Started Free</Link>
        </div>
      </nav>

      {/* ──────────── HERO SECTION ──────────── */}
      <main className="container mx-auto px-4 sm:px-6 pt-10 sm:pt-16 lg:pt-20 pb-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="w-full lg:w-[42%] lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 text-[var(--foreground)] text-xs font-bold mb-8 sm:mb-10"
            >
              <span className="text-base">🎉</span> Never miss a special moment again <span className="text-pink-500 text-base">💜</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black mb-8 sm:mb-10 tracking-tighter text-[var(--foreground)] leading-[0.88]"
            >
              Celebrate<br />every<br />birthday that<br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 bg-clip-text text-transparent italic">
                  matters
                </span>
                <span className="text-purple-400 text-2xl sm:text-3xl ml-1 not-italic">✨</span>
                <svg className="absolute -bottom-1 left-0 w-[85%]" height="8" viewBox="0 0 180 8" fill="none">
                  <path d="M2 6C40 1 140 1 178 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" />
                  <defs><linearGradient id="grad" x1="0" y1="0" x2="180" y2="0"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#ec4899" /></linearGradient></defs>
                </svg>
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-[var(--text-muted)] mb-10 sm:mb-12 leading-relaxed max-w-md mx-auto lg:mx-0 font-medium"
            >
              The intuitive dashboard to track, manage, and celebrate the birthdays of your loved ones with automated smart reminders.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center lg:justify-start"
            >
              <Link href="/register"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-base hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3"
              >
                Get Started Free <ArrowRight size={18} />
              </Link>
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 bg-transparent border border-slate-200 dark:border-slate-700 rounded-2xl text-[var(--foreground)] font-bold hover:bg-white/5 transition-all group">
                <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  <Play size={14} fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-10 sm:mt-14 flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start"
            >
              {["Setup in 2 minutes", "Smart reminders", "Gift suggestions"].map((t, i) => (
                <span key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  <CheckCircle2 size={14} className="text-indigo-500" /> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: DASHBOARD MOCKUP (hidden on mobile) ── */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hidden lg:block flex-1 relative min-w-0"
          >
            {/* Outer glow */}
            <div className="absolute -inset-8 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-[4rem] blur-3xl pointer-events-none" />

            <div className="relative bg-[#060a14] rounded-[2rem] border border-slate-800/60 shadow-[0_60px_140px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="flex">
                {/* ─ Sidebar ─ */}
                <div className="w-44 bg-[#080d1a] border-r border-slate-800/50 p-5 flex flex-col gap-6 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center"><Cake className="text-white" size={14} /></div>
                    <span className="text-[10px] font-extrabold text-white tracking-tight">BirthdayRemainder</span>
                  </div>
                  {[
                    { icon: HomeIcon, label: "Dashboard", active: true },
                    { icon: Cake, label: "Birthdays" },
                    { icon: Calendar, label: "Calendar" },
                    { icon: Bell, label: "Reminders" },
                    { icon: Users, label: "People" },
                    { icon: Gift, label: "Gift Ideas" },
                    { icon: BarChart3, label: "Statistics" },
                    { icon: Settings, label: "Settings" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${item.active ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}>
                      <item.icon size={14} />
                      {item.label}
                    </div>
                  ))}

                  {/* Gift card at bottom */}
                  <div className="mt-auto bg-gradient-to-br from-indigo-900/40 to-purple-900/30 rounded-2xl p-4 border border-indigo-800/30">
                    <div className="text-2xl mb-2">🎁</div>
                    <p className="text-[9px] font-bold text-white leading-tight mb-1">Make every moment extra special</p>
                    <p className="text-[7px] text-slate-400 mb-3">Find the perfect gift and never miss a celebration.</p>
                    <div className="px-3 py-1.5 bg-indigo-600 rounded-lg text-[8px] font-bold text-white text-center">Explore Gift Ideas</div>
                  </div>
                </div>

                {/* ─ Main Content (no calendar) ─ */}
                <div className="flex-1 p-5 min-w-0">
                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h2 className="text-sm font-bold text-white">Good morning, Alex! 👋</h2>
                      <p className="text-[8px] text-slate-500">Here&apos;s what&apos;s happening with your important people.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Bell size={14} className="text-slate-400" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full text-[6px] font-bold text-white flex items-center justify-center border border-[#060a14]">3</span>
                      </div>
                      <Avatar initials="AV" bg="bg-gradient-to-br from-indigo-500 to-purple-600" />
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-4 gap-3 mb-5">
                    <MockStatCard value="5" label="Upcoming Birthdays" sub="Next 7 days" iconBg="bg-indigo-600" icon={<Cake size={14} />} />
                    <MockStatCard value="12" label="This Month" sub="Celebrate together" iconBg="bg-emerald-600" icon={<CheckCircle2 size={14} />} />
                    <MockStatCard value="8" label="Reminders Set" sub="All automatic" iconBg="bg-amber-500" icon={<Bell size={14} />} />
                    <MockStatCard value="28" label="People" sub="In your circle" iconBg="bg-pink-500" icon={<Users size={14} />} />
                  </div>

                  {/* Upcoming List only (calendar removed) */}
                  <div className="bg-[#0d1220] rounded-2xl p-4 border border-slate-800/50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-wider">Upcoming Birthdays</h3>
                      <span className="text-[8px] font-bold text-indigo-400">View all</span>
                    </div>
                    {[
                      { name: "Sarah Johnson", date: "May 20", days: "In 3 days", turns: "Turns 29", color: "bg-pink-500" },
                      { name: "David Lee", date: "May 24", days: "In 7 days", turns: "Turns 31", color: "bg-blue-500" },
                      { name: "Emma Williams", date: "May 28", days: "In 11 days", turns: "Turns 27", color: "bg-emerald-500" },
                      { name: "John Dad", date: "June 2", days: "In 16 days", turns: "Turns 58", color: "bg-amber-500" },
                      { name: "Lisa Brown", date: "June 5", days: "In 19 days", turns: "Turns 30", color: "bg-purple-500" },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-800/30 last:border-0">
                        <div className="flex items-center gap-2.5">
                          <Avatar initials={p.name.split(' ').map(n => n[0]).join('')} bg={p.color} />
                          <div>
                            <p className="text-[9px] font-bold text-white">{p.name}</p>
                            <p className="text-[7px] text-slate-500">{p.date} · <span className="text-indigo-400">{p.days}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] text-slate-500 font-medium">{p.turns}</span>
                          <div className="w-6 h-6 bg-indigo-600/20 rounded-lg flex items-center justify-center text-indigo-400"><Gift size={10} /></div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-3 py-2.5 border-2 border-dashed border-slate-800 rounded-xl text-center text-[8px] font-bold text-slate-600">
                      + Add Birthday
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Floating 3D Gift Box & Birthday Card ─ */}
            <div className="absolute -bottom-8 -right-6 z-20">
              <div className="relative">
                <div className="text-7xl filter drop-shadow-[0_20px_40px_rgba(99,102,241,0.3)]">🎁</div>
                <div className="absolute -top-12 -left-20 bg-white dark:bg-slate-800 rounded-2xl px-4 py-3 shadow-2xl border border-slate-100 dark:border-slate-700 -rotate-6">
                  <p className="text-[10px] font-black text-slate-900 dark:text-white italic">Happy Birthday! 🎉</p>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-4 left-[45%] flex gap-2">
              <Dot color="bg-indigo-500/40" />
              <Dot color="bg-pink-500/40" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 border-t border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 relative z-10 text-[var(--text-muted)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><Cake className="text-white" size={16} /></div>
          <span className="font-extrabold tracking-tight text-[var(--foreground)]">BirthdayRemainder</span>
        </div>
        <p className="text-xs font-medium">&copy; 2026 BirthdayRemainder. All rights reserved.</p>
        <div className="flex gap-8 sm:gap-10 text-xs font-bold uppercase tracking-widest">
          <Link href="#" className="hover:text-indigo-500 transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-indigo-500 transition-colors">Terms</Link>
          <Link href="#" className="hover:text-indigo-500 transition-colors">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
