"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { 
 Bell, 
 Search, 
 Loader2, 
 Clock,
 Mail,
 Smartphone,
 CheckCircle2,
 AlertCircle,
 MoreVertical,
 Plus,
 Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function RemindersPage() {
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
 console.error("Failed to fetch reminders", err);
 } finally {
 setLoading(false);
 }
 };

 if (authLoading || loading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-zinc-50">
 <Loader2 className="animate-spin text-indigo-500" size={48} />
 </div>
 );
 }

 return (
 <main className="flex-1 p-8">
 <header className="flex justify-between items-end mb-10">
 <div>
 <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Reminders</h1>
 <p className="text-zinc-500 text-sm mt-1">Stay on top of every special day with smart, personalized reminders.</p>
 </div>
 
 <button className="btn-primary flex items-center gap-2 py-2.5 text-sm">
 <Plus size={18} /> Create Reminder
 </button>
 </header>

 {/* Reminder Stats */}
 <div className="grid grid-cols-4 gap-6 mb-10">
 <div className="bg-white p-6 rounded-[2rem] border border-zinc-50 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
 <Bell size={22} />
 </div>
 <div>
 <p className="text-2xl font-bold text-zinc-900">8</p>
 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Active Reminders</p>
 </div>
 </div>
 <div className="bg-white p-6 rounded-[2rem] border border-zinc-50 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
 <CheckCircle2 size={22} />
 </div>
 <div>
 <p className="text-2xl font-bold text-zinc-900">2</p>
 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Snoozed</p>
 </div>
 </div>
 <div className="bg-white p-6 rounded-[2rem] border border-zinc-50 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
 <Clock size={22} />
 </div>
 <div>
 <p className="text-2xl font-bold text-zinc-900">12</p>
 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Sent this month</p>
 </div>
 </div>
 <div className="bg-white p-6 rounded-[2rem] border border-zinc-50 shadow-sm flex items-center gap-4">
 <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
 <AlertCircle size={22} />
 </div>
 <div>
 <p className="text-2xl font-bold text-zinc-900">1</p>
 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Missed</p>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-8">
 <div className="col-span-2 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden">
 <div className="p-6 border-b border-zinc-50 flex justify-between items-center">
 <div className="flex gap-6">
 <button className="text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 pb-1">All Reminders</button>
 <button className="text-sm font-bold text-zinc-400 hover:text-zinc-600">By People</button>
 <button className="text-sm font-bold text-zinc-400 hover:text-zinc-600">By Channel</button>
 </div>
 <div className="flex items-center gap-3">
 <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-all border border-zinc-100 rounded-lg">
 <Settings size={18} />
 </button>
 </div>
 </div>

 <div className="divide-y divide-zinc-50">
 {upcoming.map((rem) => (
 <div key={rem.id} className="p-6 flex items-center justify-between hover:bg-zinc-50/50 transition-all group">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400 font-bold">
 {rem.friend_name[0]}
 </div>
 <div>
 <p className="font-bold text-zinc-900">{rem.friend_name}</p>
 <p className="text-[10px] text-zinc-400">Birthday • Turns {new Date().getFullYear() - (rem.year || 2000)}</p>
 </div>
 </div>

 <div>
 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1">When to remind</p>
 <p className="text-xs font-bold text-zinc-900">2 days before</p>
 <p className="text-[10px] text-zinc-500">May 18 at 9:00 AM</p>
 </div>

 <div className="flex gap-2">
 <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
 <Mail size={14} />
 </div>
 <div className="w-8 h-8 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400">
 <Smartphone size={14} />
 </div>
 </div>

 <div className="flex items-center gap-4">
 <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold">Active</span>
 <button className="p-2 text-zinc-300 hover:text-zinc-900">
 <MoreVertical size={18} />
 </button>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="space-y-6">
 <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
 <h3 className="font-bold text-zinc-900 mb-6">Reminder Settings</h3>
 <div className="space-y-4">
 <div className="flex justify-between items-center text-sm">
 <span className="text-zinc-500 font-medium">Default reminder time</span>
 <span className="font-bold text-zinc-900">9:00 AM</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-zinc-500 font-medium">Default window</span>
 <span className="font-bold text-zinc-900">2 days before</span>
 </div>
 <div className="flex justify-between items-center text-sm">
 <span className="text-zinc-500 font-medium">Smart Reminders</span>
 <span className="text-emerald-500 font-bold uppercase text-[10px]">On</span>
 </div>
 </div>
 <button className="w-full mt-8 py-3 bg-zinc-50 text-zinc-600 text-xs font-bold rounded-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-2">
 <Settings size={14} /> Manage Settings
 </button>
 </div>

 <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
 <h3 className="text-lg font-bold mb-2">Upgrade to Pro</h3>
 <p className="text-xs text-indigo-100 opacity-80 leading-relaxed mb-6">
 Get SMS reminders, group notifications, and advanced gift suggestions.
 </p>
 <button className="w-full py-3 bg-white text-indigo-600 text-xs font-bold rounded-xl shadow-lg ">
 Go Pro Now
 </button>
 </div>
 </div>
 </div>
 </main>
 );
}
