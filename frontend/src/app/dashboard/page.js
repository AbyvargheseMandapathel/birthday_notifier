"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { birthdayService } from '@/services/birthday';
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import CalendarCard from '@/components/CalendarCard';
import { Card, StatCard, Button } from '@/components/UI';
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

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, upcoming30: 0, reminders: 8 });
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  // Form state
  const [form, setForm] = useState({ friendName: '', day: '', month: '', year: '', includeYear: true, notes: '', email: '' });
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
        notes: form.notes,
        contact_email: form.email
      });
      setIsAddModalOpen(false);
      setForm({ friendName: '', day: '', month: '', year: '', includeYear: true, notes: '', email: '' });
      fetchData();
    } catch (err) {
      console.error("Add failed", err);
    } finally {
      setFormLoading(false);
    }
  };

  const getMonthName = (m) => new Date(2000, m - 1).toLocaleString('en-US', { month: 'long' });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#02040a] relative selection:bg-indigo-500/30">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
        <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
      </div>
      
      <Sidebar />

      <main className="flex-1 p-8 relative z-10">
        <DashboardHeader user={user} search={search} setSearch={setSearch} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={<Cake className="text-indigo-600" size={24} />} bg="bg-indigo-50 dark:bg-indigo-900/20" label="Upcoming" value={stats.upcoming30} sub="Next 30 days" />
          <StatCard icon={<CheckCircle2 className="text-emerald-600" size={24} />} bg="bg-emerald-50 dark:bg-emerald-900/20" label="This Month" value={stats.thisMonth} sub="Celebrate together" />
          <StatCard icon={<Bell className="text-amber-600" size={24} />} bg="bg-amber-50 dark:bg-amber-900/20" label="Reminders" value={stats.reminders} sub="All automatic" />
          <StatCard icon={<TrendingUp className="text-pink-600" size={24} />} bg="bg-pink-50 dark:bg-pink-900/20" label="Total Circle" value={stats.total} sub="In your circle" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Upcoming Birthdays" action={<button className="text-indigo-600 text-sm font-bold hover:underline">View all</button>}>
              <div className="space-y-4">
                {upcoming.length > 0 ? (
                  upcoming.slice(0, 5).map((bday) => (
                    <div key={bday.id} className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 font-bold">{bday.friend_name[0]}</div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">{bday.friend_name}</h4>
                          <p className="text-xs text-slate-400">{getMonthName(bday.month)} {bday.day} • <span className="text-indigo-500 font-medium">In {bday.days_until} days</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right mr-2">
                           <p className="text-sm font-bold text-slate-900 dark:text-white">{bday.days_until}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">days</p>
                        </div>
                        <button className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                          <Gift size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-400"><p>No upcoming birthdays found.</p></div>
                )}
              </div>
              <button onClick={() => setIsAddModalOpen(true)} className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2">
                <Plus size={20} /> Add Birthday
              </button>
            </Card>

            <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-800/50 rounded-[2rem] p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm text-indigo-600"><Clock size={24} /></div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Smart Reminders</h4>
                  <p className="text-xs text-slate-500">We'll remind you 2 days before each birthday at 9:00 AM</p>
                </div>
              </div>
              <Button variant="secondary" className="py-2 px-4 text-xs">Manage</Button>
            </div>
          </div>

          <div className="space-y-8">
            <CalendarCard birthdays={upcoming} />

            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group border border-white/5 shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500" />
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <h3 className="text-2xl font-bold">Pro Tip</h3>
                  <span className="text-2xl">💡</span>
               </div>
               <p className="text-sm text-indigo-100/80 leading-relaxed mb-8 relative z-10">
                 Adding the year of birth helps us calculate age milestones and send personalized greetings.
               </p>
               <button className="text-sm font-bold text-white flex items-center gap-2 hover:gap-3 transition-all relative z-10 group">
                 Learn more 
                 <ChevronRight size={18} className="text-indigo-400 group-hover:text-white transition-colors" />
               </button>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white dark:bg-slate-900 w-full max-w-lg p-10 rounded-[3rem] shadow-2xl relative z-10 border border-white/50 dark:border-slate-800" >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Add New Birthday</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"><X size={24} /></button>
              </div>

              <form onSubmit={handleAddBirthday} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Friend's Name</label>
                  <input type="text" required className="input-field" placeholder="Enter name" value={form.friendName} onChange={(e) => setForm({...form, friendName: e.target.value})} />
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Birthday Details</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="includeYear" checked={form.includeYear} onChange={(e) => setForm({...form, includeYear: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600" />
                      <label htmlFor="includeYear" className="text-xs text-slate-400 font-medium">Include year?</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">Month</label>
                      <select required className="input-field py-2 text-sm bg-white dark:bg-slate-800" value={form.month} onChange={(e) => setForm({...form, month: e.target.value})}>
                        <option value="">Select</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">Day</label>
                      <input type="number" required min="1" max="31" className="input-field py-2 text-sm bg-white dark:bg-slate-800" placeholder="Day" value={form.day} onChange={(e) => setForm({...form, day: e.target.value})} />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[10px] uppercase tracking-wider font-bold ml-1 ${form.includeYear ? 'text-slate-400' : 'text-slate-200 dark:text-slate-700'}`}>Year</label>
                      <input type="number" disabled={!form.includeYear} min="1900" max={new Date().getFullYear()} className="input-field py-2 text-sm bg-white dark:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed" placeholder="Year" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Contact Email</label>
                  <input type="email" className="input-field" placeholder="friend@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>

                <Button type="submit" disabled={formLoading} className="w-full py-4 shadow-xl shadow-indigo-100 dark:shadow-none">
                  {formLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Save Birthday"}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
