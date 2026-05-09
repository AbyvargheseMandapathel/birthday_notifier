"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { birthdayService } from '@/services/birthday';
import { 
 Calendar as CalendarIcon, 
 ChevronLeft, 
 ChevronRight, 
 Loader2,
 MoreVertical,
 Plus,
 Filter,
 Users as UsersIcon,
 Cake,
 Gift,
 Search,
 X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/UI';

export default function CalendarPage() {
 const { user, loading: authLoading } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({ friendName: '', day: '', month: '', year: '', includeYear: false, email: '' });

 useEffect(() => {
 if (user) {
 fetchUpcoming();
 }
 }, [user]);

  const fetchUpcoming = async () => {
    setLoading(true);
    try {
      const data = await birthdayService.getAll();
      setUpcoming(data);
    } catch (err) {
      console.error("Failed to fetch calendar data", err);
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
        year: form.includeYear ? parseInt(form.year) : null,
        email: form.email
      });
      setIsAddModalOpen(false);
      setForm({ friendName: '', day: '', month: '', year: '', includeYear: false, email: '' });
      fetchUpcoming();
    } catch (err) {
      console.error("Failed to add birthday", err);
    } finally {
      setFormLoading(false);
    }
  };

  const getMonthName = (m) => new Date(2000, m - 1).toLocaleString('default', { month: 'long' });

  const openAddForDay = (d) => {
    setForm({ ...form, day: d.toString(), month: (month + 1).toString() });
    setIsAddModalOpen(true);
  };

  const getBirthdaysForDay = (day) => {
    return upcoming.filter(b => b.day === day && b.month === (month + 1));
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

 if (authLoading || loading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-zinc-50">
 <Loader2 className="animate-spin text-indigo-500" size={48} />
 </div>
 );
 }

 return (
  <main className="flex-1 p-6 flex flex-col relative overflow-hidden h-full">
    {/* Background Glow */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
      <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
    </div>

  <header className="flex justify-between items-end mb-10 relative z-10">
  <div>
  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Calendar</h1>
  <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">View all birthdays and special days at a glance.</p>
  </div>
 
 <div className="flex items-center gap-3">
 <button onClick={goToday} className="btn-secondary py-2.5 text-sm flex items-center gap-2">
 Today
 </button>
 <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-xl p-1">
 <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-50 rounded-lg text-zinc-400"><ChevronLeft size={18} /></button>
 <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-50 rounded-lg text-zinc-400"><ChevronRight size={18} /></button>
 </div>
   <h2 className="text-xl font-bold text-zinc-900 dark:text-white ml-4">
     {monthName}
   </h2>
 </div>

  <div className="flex items-center gap-3">
    <div className="flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1">
      <button className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold">Month</button>
      <button className="px-4 py-1.5 text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">Week</button>
      <button className="px-4 py-1.5 text-zinc-400 rounded-lg text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">List</button>
    </div>
      <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center gap-2 py-2.5 text-sm ml-2">
        <Plus size={18} /> Add Birthday
      </button>
  </div>
 </header>

  <div className="flex-1 grid grid-cols-4 gap-8 min-h-0 overflow-hidden">
 {/* Calendar Grid */}
  <div className="col-span-3 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-y-auto scrollbar-hide flex flex-col relative z-10">
    <div className="grid grid-cols-7 border-b border-zinc-50 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-800/20">
      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
        <div key={day} className="py-4 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{day}</div>
      ))}
    </div>
  <div className="flex-1 grid grid-cols-7 border border-zinc-100 dark:border-zinc-800/50 rounded-b-[2.5rem] overflow-hidden">
  {Array.from({ length: 42 }, (_, i) => {
     const firstDay = new Date(year, month, 1).getDay();
     const day = i - firstDay + 1;
     const daysInMonth = new Date(year, month + 1, 0).getDate();
     
     const dayBirthdays = getBirthdaysForDay(day);
     const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
    return (
      <div 
        key={i} 
        onClick={() => day > 0 && day <= daysInMonth && openAddForDay(day)}
        className={`p-2 min-h-[90px] transition-colors hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 relative cursor-pointer border-r border-b border-zinc-100/50 dark:border-zinc-800/30 ${day < 1 || day > daysInMonth ? 'opacity-20 bg-zinc-50/20 dark:bg-zinc-800/10 pointer-events-none' : ''}`}
      >
        <span className={`text-[10px] font-bold ${isToday ? 'bg-indigo-600 text-white w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-indigo-500/30' : 'text-zinc-400 dark:text-zinc-500'}`}>
          {day > 0 && day <= daysInMonth ? day : ''}
        </span>

        {dayBirthdays.length > 0 && day > 0 && day <= daysInMonth && (
          <div className="mt-1 space-y-1">
            {dayBirthdays.map((bday, idx) => (
              <div key={idx} className={`p-1 rounded-lg border flex items-center gap-1.5 ${isToday ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20' : 'bg-pink-50 dark:bg-pink-500/10 border-pink-100 dark:border-pink-500/20'}`}>
                <div className={`w-4 h-4 rounded-md flex items-center justify-center text-[6px] font-bold shrink-0 ${isToday ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}`}>
                  {bday.friend_name[0]}
                </div>
                <span className={`text-[8px] font-bold truncate ${isToday ? 'text-indigo-900 dark:text-indigo-200' : 'text-pink-900 dark:text-pink-200'}`}>
                  {bday.friend_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  })}
 </div>
 </div>

 {/* Sidebar Details */}
  <div className="space-y-6 relative z-10 overflow-y-auto scrollbar-hide pr-1 pb-8">
    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm ">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-zinc-900 dark:text-white">Upcoming Birthdays</h3>
        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">View all</span>
      </div>
      
      <div className="space-y-6">
        {upcoming.slice(0, 4).map((bday) => (
          <div key={bday.id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 font-bold text-sm">
                {bday.friend_name[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{bday.friend_name}</h4>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">May {bday.day} • In {bday.days_until} days</p>
              </div>
            </div>
            <button className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-300 dark:text-zinc-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all opacity-0 group-hover:opacity-100">
              <Gift size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-8 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm mb-6">
        <CalendarIcon size={32} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Sync your calendar</h3>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
        Keep all your important dates in sync across devices with Google or Outlook.
      </p>
      <button className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2">
        Connect Calendar
      </button>
    </div>

    <div className="p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
      <h4 className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4 px-2">Calendar Legend</h4>
      <div className="space-y-2">
        {[
          { label: 'Family', color: 'bg-pink-500' },
          { label: 'Friends', color: 'bg-indigo-500' },
          { label: 'Colleagues', color: 'bg-blue-500' },
          { label: 'Other', color: 'bg-emerald-500' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2 px-2 py-1">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  </div>

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
