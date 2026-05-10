"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { 
  Settings as SettingsIcon, 
  Bell, 
  User, 
  Lock, 
  Save, 
  Loader2, 
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/UI';

export default function SettingsPage() {
  const { user, setUser, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('notifications');

  const [form, setForm] = useState({
    reminder_days_before: 2,
    reminder_time: '09:00',
    is_smart_reminders_enabled: true,
    username: '',
    email: '',
    timezone: 'UTC'
  });

  useEffect(() => {
    if (user) {
      setForm({
        reminder_days_before: user.reminder_days_before || 2,
        reminder_time: user.reminder_time?.substring(0, 5) || '09:00',
        is_smart_reminders_enabled: user.is_smart_reminders_enabled !== false,
        username: user.username || '',
        email: user.email || '',
        timezone: user.timezone || 'UTC'
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.patch('/api/users/me/', form);
      setUser(res.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 lg:p-8 relative overflow-y-auto h-full scrollbar-hide">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
        <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
      </div>

      <header className="mb-10 relative z-10">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">Manage your account and notification preferences.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Sidebar Nav */}
        <aside className="lg:w-64 flex flex-col gap-1">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: ShieldCheck },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-white shadow-sm border border-zinc-100 dark:border-zinc-800' 
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-white/50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-600">
                          <Smartphone size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white">Smart Reminders</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Get notified before your friends' birthdays.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({...form, is_smart_reminders_enabled: !form.is_smart_reminders_enabled})}
                        className={`w-14 h-8 rounded-full transition-all relative ${form.is_smart_reminders_enabled ? 'bg-indigo-600' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                      >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${form.is_smart_reminders_enabled ? 'left-7' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-50 dark:border-zinc-800/50">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Reminder (Days Before)</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <input 
                            type="number" 
                            min="0" 
                            max="30" 
                            className="input-field pl-11" 
                            value={form.reminder_days_before} 
                            onChange={(e) => setForm({...form, reminder_days_before: e.target.value})} 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Notification Time</label>
                        <div className="relative">
                          <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                          <input 
                            type="time" 
                            className="input-field pl-11" 
                            value={form.reminder_time} 
                            onChange={(e) => setForm({...form, reminder_time: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Username</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        value={form.username} 
                        onChange={(e) => setForm({...form, username: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        disabled
                        className="input-field opacity-50 cursor-not-allowed" 
                        value={form.email} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Timezone</label>
                      <select 
                        className="input-field" 
                        value={form.timezone} 
                        onChange={(e) => setForm({...form, timezone: e.target.value})}
                      >
                        <option value="UTC">UTC (Universal Coordinated Time)</option>
                        <option value="Asia/Kolkata">IST (India Standard Time)</option>
                        <option value="America/New_York">EST (Eastern Standard Time)</option>
                        <option value="Europe/London">GMT (London Time)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-zinc-400 mb-4">
                        <Lock size={32} />
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Security Settings</h3>
                      <p className="text-sm text-zinc-500 max-w-xs mt-2">Update your password and manage active sessions.</p>
                      <Button className="mt-6 px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4 pt-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="px-10 py-4 shadow-xl flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Changes
              </Button>
              
              <AnimatePresence>
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm"
                  >
                    <CheckCircle2 size={18} /> Settings updated!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
