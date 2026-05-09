"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import Link from 'next/link';
import { Cake, Lock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function ResetPasswordContent() {
 const searchParams = useSearchParams();
 const router = useRouter();
 const token = searchParams.get('token');

 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [success, setSuccess] = useState(false);

 useEffect(() => {
 if (!token) {
 setError('Invalid or missing reset token. Please request a new one.');
 }
 }, [token]);

 const handleSubmit = async (e) => {
 e.preventDefault();
 if (password !== confirmPassword) {
 setError('Passwords do not match');
 return;
 }
 setLoading(true);
 setError('');
 try {
 await api.post('/api/auth/password_reset/confirm/', {
 token: token,
 password: password
 });
 setSuccess(true);
 setTimeout(() => {
 router.push('/login');
 }, 3000);
 } catch (err) {
 setError('Failed to reset password. The link may have expired.');
 } finally {
 setLoading(false);
 }
 };

 return (
 <>
 <div className="text-center mb-10">
 <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl ">
 <Cake className="text-white" size={32} />
 </div>
 <h1 className="text-3xl font-bold mb-2 text-zinc-900 tracking-tight">Reset Password</h1>
 <p className="text-zinc-500 mt-2 text-sm">Enter your new secure password</p>
 </div>

 {success ? (
 <motion.div 
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center space-y-6"
 >
 <div className="bg-green-50 border border-green-100 text-green-600 p-8 rounded-[2.5rem] flex flex-col items-center gap-4">
 <CheckCircle size={56} className="text-green-500" />
 <div>
 <p className="text-xl font-bold">Password Reset!</p>
 <p className="text-sm opacity-80 mt-1">Redirecting you to login...</p>
 </div>
 </div>
 </motion.div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-6">
 {error && (
 <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-sm flex items-center gap-3 font-medium">
 <AlertCircle size={20} className="shrink-0" />
 {error}
 </div>
 )}

 {!token && (
 <Link href="/forgot-password" title="Request new link" className="btn-secondary w-full flex items-center justify-center">
 Request New Link
 </Link>
 )}

 {token && (
 <>
 <div className="space-y-2">
 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">New Password</label>
 <div className="relative">
 <Lock className="absolute left-4 top-3.5 text-zinc-400" size={18} />
 <input 
 type="password" 
 required 
 className="input-field pl-12 bg-zinc-50/50 border-zinc-100 focus:bg-white"
 placeholder="••••••••"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Confirm New Password</label>
 <div className="relative">
 <Lock className="absolute left-4 top-3.5 text-zinc-400" size={18} />
 <input 
 type="password" 
 required 
 className="input-field pl-12 bg-zinc-50/50 border-zinc-100 focus:bg-white"
 placeholder="••••••••"
 value={confirmPassword}
 onChange={(e) => setConfirmPassword(e.target.value)}
 />
 </div>
 </div>

 <button 
 type="submit" 
 disabled={loading}
 className="btn-primary w-full flex items-center justify-center gap-2 mt-4 py-4 shadow-xl "
 >
 {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
 </button>
 </>
 )}
 </form>
 )}
 </>
 );
}

export default function ResetPasswordPage() {
 return (
 <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 relative overflow-hidden">
 {/* Decorative blobs */}
 <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
 <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />
 <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[120px] opacity-60" />
 </div>
 
 <motion.div 
 initial={{ opacity: 0, scale: 0.95 }}
 animate={{ opacity: 1, scale: 1 }}
 className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-xl relative z-10 border border-white"
 >
 <Suspense fallback={
 <div className="flex flex-col items-center justify-center py-10 gap-4">
 <Loader2 className="animate-spin text-indigo-500" size={40} />
 <p className="text-zinc-400 text-sm font-medium">Loading...</p>
 </div>
 }>
 <ResetPasswordContent />
 </Suspense>
 </motion.div>
 </div>
 );
}
