"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Sidebar from '@/components/Sidebar';
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
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalendarPage() {
  const { user, loading: authLoading } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUpcoming();
    }
  }, [user]);

  const fetchUpcoming = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/birthdays/upcoming/');
      setUpcoming(res.data);
    } catch (err) {
      console.error("Failed to fetch calendar data", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />

      <main className="flex-1 p-8 flex flex-col">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Calendar</h1>
            <p className="text-slate-500 text-sm mt-1">View all birthdays and special days at a glance.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="btn-secondary py-2.5 text-sm flex items-center gap-2">
                Today
             </button>
             <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1">
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft size={18} /></button>
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight size={18} /></button>
             </div>
             <h2 className="text-xl font-bold text-slate-900 ml-4">May 2024</h2>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                <button className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">Month</button>
                <button className="px-4 py-1.5 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">Week</button>
                <button className="px-4 py-1.5 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all">List</button>
             </div>
             <button className="btn-primary flex items-center gap-2 py-2.5 text-sm ml-2">
                <Filter size={18} /> Filters
             </button>
          </div>
        </header>

        <div className="flex-1 grid grid-cols-4 gap-8">
            {/* Calendar Grid */}
            <div className="col-span-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/30">
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                        <div key={day} className="py-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">{day}</div>
                    ))}
                </div>
                <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-slate-50">
                    {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 2; // Simple offset for May 2024
                        const hasBirthday = day === 20 || day === 15 || day === 28;
                        const isToday = day === 20;
                        
                        return (
                            <div key={i} className={`p-4 min-h-[120px] transition-colors hover:bg-slate-50/50 relative ${day < 1 || day > 31 ? 'opacity-20 bg-slate-50/20' : ''}`}>
                                <span className={`text-xs font-bold ${isToday ? 'bg-indigo-600 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-400'}`}>
                                    {day > 0 && day <= 31 ? day : ''}
                                </span>

                                {hasBirthday && day > 0 && day <= 31 && (
                                    <div className={`mt-2 p-2 rounded-xl border flex flex-col gap-1 ${isToday ? 'bg-indigo-50 border-indigo-100' : 'bg-pink-50 border-pink-100'}`}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-bold ${isToday ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}`}>
                                                {day === 20 ? 'SJ' : 'DL'}
                                            </div>
                                            <span className={`text-[10px] font-bold truncate ${isToday ? 'text-indigo-900' : 'text-pink-900'}`}>
                                                {day === 20 ? 'Sarah Johnson' : 'David Lee'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm shadow-slate-200/20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900">Upcoming Birthdays</h3>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">View all</span>
                    </div>
                    
                    <div className="space-y-6">
                        {upcoming.slice(0, 4).map((bday) => (
                            <div key={bday.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-sm">
                                        {bday.friend_name[0]}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{bday.friend_name}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium">May {bday.day} • In {bday.days_until} days</p>
                                    </div>
                                </div>
                                <button className="p-2 bg-slate-50 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all opacity-0 group-hover:opacity-100">
                                    <Gift size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                        <CalendarIcon size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">Sync your calendar</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-6">
                        Keep all your important dates in sync across devices with Google or Outlook.
                    </p>
                    <button className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2">
                        Connect Calendar
                    </button>
                </div>

                <div className="p-4 bg-white rounded-[2rem] border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">Calendar Legend</h4>
                    <div className="space-y-2">
                        {[
                            { label: 'Family', color: 'bg-pink-500' },
                            { label: 'Friends', color: 'bg-indigo-500' },
                            { label: 'Colleagues', color: 'bg-blue-500' },
                            { label: 'Other', color: 'bg-emerald-500' },
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-2 px-2 py-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`}></div>
                                <span className="text-[11px] text-slate-600 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
