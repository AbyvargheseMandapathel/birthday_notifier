"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Cake, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const { login } = useAuth();

 const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 setError('');
 try {
 await login(email, password);
 } catch (err) {
 setError('Invalid email or password. Please try again.');
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="min-h-screen flex items-center justify-center p-6 bg-[#02040a] relative overflow-hidden selection:bg-indigo-500/30">
 {/* Background Glows */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden">
 <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px]" />
 <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[160px]" />
 </div>
 
 <motion.div 
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 animate={{ opacity: 1, scale: 1, y: 0 }}
 className="bg-[#0b0f1a] w-full max-w-md p-10 sm:p-14 rounded-[3.5rem] shadow-[0_80px_120px_-20px_rgba(0,0,0,0.6)] relative z-10 border border-zinc-800/50"
 >
 <div className="text-center mb-10">
 <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl ">
 <Cake className="text-white" size={32} />
 </div>
 <h1 className="text-4xl font-extrabold text-white tracking-tight">Welcome Back</h1>
 <p className="text-zinc-400 mt-2 text-sm font-medium">Log in to manage your birthday reminders</p>
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

 <form onSubmit={handleSubmit} className="space-y-7">
 <div className="space-y-2">
 <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
 <div className="relative group">
 <Mail className="absolute left-5 top-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
 <input 
 type="email" 
 required 
 className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-zinc-800/80 focus:border-indigo-500 placeholder:text-zinc-700"
 placeholder="me@example.com"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 />
 </div>
 </div>

 <div className="space-y-2">
 <div className="flex justify-between items-center ml-1">
 <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Password</label>
 <Link href="/forgot-password" title="Go to forgot password page" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot Password?</Link>
 </div>
 <div className="relative group">
 <Lock className="absolute left-5 top-5 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
 <input 
 type="password" 
 required 
 className="w-full bg-[#02040a] text-white rounded-2xl pl-14 pr-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all border border-zinc-800/80 focus:border-indigo-500 placeholder:text-zinc-700"
 placeholder="••••••••"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 </div>

 <button 
 type="submit" 
 disabled={loading}
 className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 group"
 >
 {loading ? <Loader2 className="animate-spin" size={24} /> : (
 <>
 <span className="text-lg">Sign In</span>
 <ArrowRight size={22} className="group-hover:tranzinc-x-1 transition-transform" />
 </>
 )}
 </button>
 </form>

 <p className="mt-12 text-center text-zinc-500 text-sm font-bold">
 Don't have an account? {' '}
 <Link href="/register" className="text-indigo-400 font-black hover:underline transition-all underline-offset-4">
 Create account
 </Link>
 </p>
 </motion.div>
 </div>
 );
}
