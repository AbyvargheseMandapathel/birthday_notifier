"use client";
import { useState } from 'react';
import { authService } from '@/services/auth';
import Link from 'next/link';
import { Cake, Mail, ArrowLeft, Loader2, CheckCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please check your email address.');
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
        className="bg-[#0b0f1a] w-full max-w-md p-10 sm:p-14 rounded-[3.5rem] shadow-[0_80px_120px_-20px_rgba(0,0,0,0.6)] relative z-10 border border-slate-800/50"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40 text-white">
            <Cake size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Forgot Password</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium">We'll send you instructions to reset it</p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-8"
            >
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-8 rounded-[2.5rem] flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                   <p className="text-lg font-bold">Check your email</p>
                   <p className="text-xs opacity-70 leading-relaxed max-w-[200px] mx-auto">Instructions have been sent to <span className="text-white font-bold">{email}</span></p>
                </div>
              </div>
              
              <Link href="/login" className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit} 
              className="space-y-7"
            >
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm font-bold text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
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

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 rounded-2xl shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70 group"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    <span className="text-lg">Send Reset Link</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>

              <Link href="/login" className="flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold group pt-2">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
