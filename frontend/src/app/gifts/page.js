"use client";
import Sidebar from '@/components/Sidebar';
import { Gift, Sparkles, Clock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function GiftIdeasPage() {
 const { loading: authLoading } = useAuth();

 if (authLoading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-zinc-50">
 <Loader2 className="animate-spin text-indigo-500" size={48} />
 </div>
 );
 }

 return (
 <div className="flex min-h-screen bg-zinc-50/50">
 <Sidebar />

 <main className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
 {/* Decorative background elements */}
 <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-100 rounded-full blur-[120px] opacity-60" />
 <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60" />

 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 className="text-center max-w-2xl relative z-10"
 >
 <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mx-auto mb-10">
 <Gift size={48} className="text-indigo-600" />
 </div>
 
 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold mb-6">
 <Sparkles size={14} />
 AI-Powered Feature
 </div>

 <h1 className="text-5xl font-black text-zinc-900 mb-6 tracking-tighter">
 Personalized <span className="text-indigo-600">Gift Ideas</span>
 </h1>
 
 <p className="text-lg text-zinc-500 mb-12 leading-relaxed">
 We're building an intelligent engine that suggests the perfect gift based on your friend's 
 interests, age, and your past celebrations. Never worry about what to buy again.
 </p>

 <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
 <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-2xl border border-zinc-100 shadow-sm text-zinc-600 font-bold text-sm">
 <Clock size={18} className="text-indigo-500" />
 Launching Summer 2024
 </div>
 <button className="btn-primary px-8 flex items-center gap-2">
 Notify Me <ArrowRight size={18} />
 </button>
 </div>

 <div className="grid grid-cols-3 gap-6 mt-20 text-left">
 {[
 { title: "Smart Analysis", desc: "AI analyzes personality traits to find matching items." },
 { title: "Budget Friendly", desc: "Filter suggestions by your preferred price range." },
 { title: "One-Click Buy", desc: "Direct links to top retailers for hassle-free shopping." }
 ].map((feature, i) => (
 <div key={i} className="p-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm">
 <h4 className="font-bold text-zinc-900 mb-2">{feature.title}</h4>
 <p className="text-xs text-zinc-500 leading-relaxed">{feature.desc}</p>
 </div>
 ))}
 </div>
 </motion.div>
 </main>
 </div>
 );
}
