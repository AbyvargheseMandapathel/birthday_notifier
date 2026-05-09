"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Cake, Mail, Lock, User, Globe, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(email, username, password, timezone);
    } catch (err) {
      setError(err.response?.data?.email?.[0] || err.response?.data?.username?.[0] || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#02040a] relative overflow-hidden selection:bg-indigo-500/30">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[160px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0b0f1a] w-full max-w-2xl p-10 sm:p-14 rounded-[3.5rem] shadow-[0_80px_120px_-20px_rgba(0,0,0,0.6)] relative z-10 border border-slate-800/50"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
            <Cake className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">Join BirthdayRemainder and never forget a date</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 text-sm font-bold text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-7">
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="email" 
                required 
                className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-slate-800/80 focus:border-indigo-500 placeholder:text-slate-700"
                placeholder="me@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="text" 
                required 
                className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-slate-800/80 focus:border-indigo-500 placeholder:text-slate-700"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Timezone</label>
            <div className="relative group">
              <Globe className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <select 
                className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-10 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-slate-800/80 focus:border-indigo-500 appearance-none text-slate-300"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">EST (New York)</option>
                <option value="Europe/London">GMT (London)</option>
                <option value="Asia/Kolkata">IST (Kolkata)</option>
                <option value="Asia/Dubai">GST (Dubai)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
              <input 
                type="password" 
                required 
                className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-slate-800/80 focus:border-indigo-500 placeholder:text-slate-700"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:col-span-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 mt-2 group"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <span className="text-lg">Create Account</span>
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-12 text-center text-slate-500 text-sm font-bold">
          Already have an account? {' '}
          <Link href="/login" className="text-indigo-400 font-black hover:underline transition-all underline-offset-4">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
