"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { birthdayService } from '@/services/birthday';
import DashboardHeader from '@/components/DashboardHeader';
import CalendarCard from '@/components/CalendarCard';
import { Card, StatCard, Button, Avatar, AvatarGroup } from '@/components/UI';
import { 
  Cake, 
  Plus, 
  Bell, 
  Loader2, 
  X, 
  ChevronRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ChevronLeft,
  Send,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartReminderModal from '@/components/SmartReminderModal';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, upcoming30: 0, reminders: 8 });
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightedId, setHighlightedId] = useState(null);
  
  // Form state
  const [form, setForm] = useState({ 
    friendName: '', 
    day: '', 
    month: '', 
    year: '', 
    includeYear: true, 
    notes: '', 
    email: '',
    relationship: 'friend',
    group: 'Friends'
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [upcomingData, allData] = await Promise.all([
        birthdayService.getUpcoming(),
        birthdayService.getAll()
      ]);
      setUpcoming(upcomingData);
      
      const currentMonth = new Date().getMonth() + 1;
      setStats({
        total: allData.length,
        thisMonth: allData.filter(b => b.month === currentMonth).length,
        upcoming30: upcomingData.length,
        reminders: 8
      });
    } catch (err) {
      console.error("Failed to fetch birthdays", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBirthday = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await birthdayService.add({
        friend_name: form.friendName,
        day: parseInt(form.day),
        month: parseInt(form.month),
        year: form.includeYear && form.year ? parseInt(form.year) : null,
        relationship: form.relationship,
        group: form.group,
        notes: form.notes,
        contact_email: form.email
      });
      setIsAddModalOpen(false);
      setForm({ 
        friendName: '', 
        day: '', 
        month: '', 
        year: '', 
        includeYear: true, 
        notes: '', 
        email: '',
        relationship: 'friend',
        group: 'Friends'
      });
      fetchData();
    } catch (err) {
      console.error("Add failed", err);
    } finally {
      setFormLoading(false);
    }
  };

  const getMonthName = (m) => new Date(2000, m - 1).toLocaleString('en-US', { month: 'long' });

  const getUrgencyStyles = (days) => {
    if (days < 1) return 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/20';
    if (days < 3) return 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20';
    if (days < 7) return 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20';
    return 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20';
  };

  const getReminderText = (daysUntil) => {
    if (!user?.is_smart_reminders_enabled) return null;
    const reminderDays = user?.reminder_days_before || 0;
    const daysToReminder = daysUntil - reminderDays;
    
    if (daysToReminder > 0) return `Reminder in ${daysToReminder} day${daysToReminder > 1 ? 's' : ''}`;
    if (daysToReminder === 0) return `Reminder today at ${user?.reminder_time?.substring(0, 5)}`;
    return "Reminder already sent";
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 lg:p-6 relative z-10 flex flex-col h-full min-w-0">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
      </div>
      

      <DashboardHeader user={user} search={search} setSearch={setSearch} totalContacts={stats.total} onQuickAdd={() => setIsAddModalOpen(true)} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Column - Main Scrollable Content */}
        <div className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto scrollbar-hide pr-2 pb-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
            <StatCard icon={<Cake className="text-white" size={20} />} isPrimary={true} label="Upcoming" value={stats.upcoming30} sub="Next 30 days" />
            <StatCard icon={<CheckCircle2 className="text-zinc-500 dark:text-zinc-400" size={20} />} label="Month's Wishes" value={user?.total_wishes_sent || 0} sub="🎉 High five!" />
            <StatCard icon={<Bell className="text-zinc-500 dark:text-zinc-400" size={20} />} label="Reminders" value={stats.reminders} sub="All automatic" />
            <StatCard icon={<TrendingUp className="text-zinc-500 dark:text-zinc-400" size={20} />} label="Total Circle" value={stats.total} sub="In your circle" avatars={upcoming} />
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">
                    {(user?.streak_count || 0) > 0 ? "You're on fire! 🔥" : "Start your streak! ✨"}
                  </h3>
                  <p className="text-indigo-100 text-sm">
                    {(user?.streak_count || 0) > 0 
                      ? `${user?.streak_count} wish streak. Keep it going!` 
                      : "Send your first wish to start a streak!"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{user?.streak_count || 0}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Day Streak</p>
              </div>
            </div>
          </div>

          <Card 
            className="shrink-0" 
            title="Upcoming Birthdays" 
            action={
              <div className="flex items-center gap-3">
                <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-500 transition-all shadow-sm">
                  <Plus size={14} /> Add New
                </button>
                <button className="text-zinc-400 text-xs font-medium hover:text-indigo-600 transition-all">View all</button>
              </div>
            }
          >
            <div className="space-y-1">
              {upcoming.length > 0 ? (
                upcoming.map((bday, index) => (
                  <div 
                    key={bday.id} 
                    id={`birthday-${bday.id}`}
                    className={`flex items-center justify-between py-3.5 px-3 rounded-2xl transition-all group ${
                      highlightedId === bday.id 
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 ring-2 ring-indigo-500/20' 
                        : index % 2 === 0 ? 'bg-transparent' : 'bg-zinc-50/50 dark:bg-zinc-800/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar name={bday.friend_name} />
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white leading-tight mb-0.5">{bday.friend_name}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-400">{getMonthName(bday.month)} {bday.day}</span>
                          {getReminderText(bday.days_until) && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                              <span className="text-[10px] font-medium text-zinc-400 italic">
                                {getReminderText(bday.days_until)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {bday.days_until < 7 && (
                        <Link 
                          href="/gifts"
                          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-bold hover:text-indigo-600 transition-all border border-zinc-200/50 dark:border-zinc-700/50"
                        >
                          <Gift size={12} /> Gift ideas →
                        </Link>
                      )}
                      <div className={`px-3 py-1 rounded-full border text-[11px] font-bold tracking-wide ${getUrgencyStyles(bday.days_until)}`}>
                        In {bday.days_until} days
                      </div>
                      <div className="relative group/share">
                        <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <Send size={18} />
                        </button>
                        
                        {/* Social Links Popover */}
                        <div className="absolute right-0 bottom-full mb-2 opacity-0 invisible group-hover/share:opacity-100 group-hover/share:visible transition-all duration-300 translate-y-2 group-hover/share:translate-y-0 z-20">
                          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-1.5 shadow-xl flex items-center gap-1 min-w-[120px]">
                            <a 
                              href={`https://wa.me/?text=Happy Birthday, ${bday.friend_name}! 🎂`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-600 rounded-xl transition-all"
                              title="WhatsApp"
                            >
                              <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 4l-2.1 4.7Z"/></svg>
                            </a>
                            <a 
                              href="https://www.instagram.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-pink-50 dark:hover:bg-pink-500/10 text-zinc-500 hover:text-pink-600 rounded-xl transition-all"
                              title="Instagram"
                            >
                              <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a 
                              href="https://www.facebook.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 text-zinc-500 hover:text-blue-600 rounded-xl transition-all"
                              title="Facebook"
                            >
                              <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                          </div>
                          {/* Arrow */}
                          <div className="absolute right-3 top-full border-[6px] border-transparent border-t-white dark:border-t-zinc-900 drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-zinc-400">
                  <Cake size={40} className="mx-auto mb-4 opacity-20" />
                  <p className="text-sm">No upcoming birthdays found. Add your first friend!</p>
                </div>
              )}
            </div>
          </Card>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-5 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400"><Clock size={20} /></div>
              <div>
                <h4 className="font-medium text-zinc-900 dark:text-white text-sm">Smart Reminders</h4>
                <p className="text-xs text-zinc-500">
                  {user?.is_smart_reminders_enabled !== false ? (
                    `Notify ${user?.reminder_days_before === 0 ? 'on the day' : `${user?.reminder_days_before} days before`} at ${user?.reminder_time?.substring(0, 5) || '09:00'}`
                  ) : (
                    'Notifications are currently disabled'
                  )}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="py-2 px-5 text-xs font-medium rounded-xl shadow-sm"
            >
              Manage Alerts
            </Button>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="flex flex-col min-h-0 gap-4 overflow-y-auto scrollbar-hide pb-6 pr-1">
          <CalendarCard 
            birthdays={upcoming} 
            onEventClick={(id) => {
              setHighlightedId(id);
              const element = document.getElementById(`birthday-${id}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              // Clear highlight after 3 seconds
              setTimeout(() => setHighlightedId(null), 3000);
            }} 
          />
        </div>
      </div>

      <SmartReminderModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        user={user}
        onUpdate={(updatedUser) => setUser(updatedUser)}
      />

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white dark:bg-zinc-900 w-full max-w-lg p-10 rounded-[3rem] shadow-2xl relative z-10 border border-white/50 dark:border-zinc-800" >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Add New Birthday</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleAddBirthday} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Friend's Name</label>
                  <input type="text" required className="input-field" placeholder="Enter name" value={form.friendName} onChange={(e) => setForm({...form, friendName: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Relationship</label>
                    <select required className="input-field py-2.5 text-sm" value={form.relationship} onChange={(e) => setForm({...form, relationship: e.target.value})}>
                      <option value="friend">Friend</option>
                      <option value="family">Family</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Group</label>
                    <input type="text" className="input-field" placeholder="Friends, School, etc." value={form.group} onChange={(e) => setForm({...form, group: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-4 bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 block">Birthday Date</label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold ml-1">Month</label>
                      <select required className="input-field py-2 text-sm bg-white dark:bg-zinc-800" value={form.month} onChange={(e) => setForm({...form, month: e.target.value})}>
                        <option value="">Select</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold ml-1">Day</label>
                      <input type="number" required min="1" max="31" className="input-field py-2 text-sm bg-white dark:bg-zinc-800" placeholder="Day" value={form.day} onChange={(e) => setForm({...form, day: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Contact Email</label>
                  <input type="email" className="input-field" placeholder="friend@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>

                <Button type="submit" disabled={formLoading} className="w-full py-4 shadow-xl dark:shadow-none">
                  {formLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Save Birthday"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
