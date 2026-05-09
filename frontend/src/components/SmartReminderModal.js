"use client";
import { useState } from 'react';
import { X, Clock, Bell, Calendar, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';

export default function SmartReminderModal({ isOpen, onClose, user, onUpdate }) {
 const [daysBefore, setDaysBefore] = useState(user?.reminder_days_before || 2);
 const [reminderTime, setReminderTime] = useState(user?.reminder_time?.substring(0, 5) || "09:00");
 const [isEnabled, setIsEnabled] = useState(user?.is_smart_reminders_enabled !== false);
 const [loading, setLoading] = useState(false);
 const [success, setSuccess] = useState(false);

 const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 try {
 const response = await api.patch('/api/users/settings/', {
 reminder_days_before: daysBefore,
 reminder_time: reminderTime + ":00",
 is_smart_reminders_enabled: isEnabled
 });
 onUpdate(response.data);
 setSuccess(true);
 setTimeout(() => {
 setSuccess(false);
 onClose();
 }, 1500);
 } catch (err) {
 console.error("Failed to update settings", err);
 } finally {
 setLoading(false);
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
 />
 
 <motion.div
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 exit={{ opacity: 0, scale: 0.95, y: 20 }}
 className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800"
 >
 {success ? (
 <div className="p-12 text-center">
 <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
 <CheckCircle2 size={40} />
 </div>
 <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Settings Saved!</h3>
 <p className="text-zinc-500 text-sm">Your reminder preferences have been updated.</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="p-8">
 <div className="flex justify-between items-center mb-8">
 <div>
 <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">Smart Reminders</h2>
 <p className="text-zinc-500 text-xs mt-1">Configure how and when you get notified.</p>
 </div>
 <button 
 type="button"
 onClick={onClose}
 className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-400 transition-all"
 >
 <X size={20} />
 </button>
 </div>

 <div className="space-y-6">
 {/* Toggle Switch */}
 <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
 <div className="flex items-center gap-3">
 <div className={`p-2 rounded-xl ${isEnabled ? 'bg-indigo-100 text-indigo-600' : 'bg-zinc-200 text-zinc-500'} transition-colors`}>
 <Bell size={18} />
 </div>
 <div>
 <p className="text-sm font-bold text-zinc-900 dark:text-white">Enable Notifications</p>
 <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Smart Alerts</p>
 </div>
 </div>
 <button
 type="button"
 onClick={() => setIsEnabled(!isEnabled)}
 className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isEnabled ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'}`}
 >
 <span
 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isEnabled ? 'tranzinc-x-6' : 'tranzinc-x-1'}`}
 />
 </button>
 </div>

 <div className={isEnabled ? 'space-y-6' : 'opacity-40 pointer-events-none space-y-6 transition-all'}>
 {/* Days Before */}
 <div>
 <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
 <Calendar size={14} /> Notify me before
 </label>
 <div className="grid grid-cols-4 gap-2">
 {[0, 1, 2, 7].map((d) => (
 <button
 key={d}
 type="button"
 onClick={() => setDaysBefore(d)}
 className={`py-3 rounded-xl text-sm font-bold transition-all border ${
 daysBefore === d 
 ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg ' 
 : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-indigo-300'
 }`}
 >
 {d === 0 ? 'Day of' : `${d}d`}
 </button>
 ))}
 </div>
 </div>

 {/* Time Selection */}
 <div>
 <label className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
 <Clock size={14} /> Notification Time
 </label>
 <input
 type="time"
 value={reminderTime}
 onChange={(e) => setReminderTime(e.target.value)}
 className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-5 py-4 text-zinc-900 dark:text-white font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
 />
 </div>
 </div>
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full mt-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
 >
 {loading ? (
 <Loader2 className="animate-spin" size={20} />
 ) : (
 "Save Preferences"
 )}
 </button>
 </form>
 )}
 </motion.div>
 </div>
 );
}
