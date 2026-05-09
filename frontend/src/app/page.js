"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cake, Bell, Shield, Calendar } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 rounded-full blur-[120px] animate-pulse" />

      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Cake className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Birthday<span className="text-indigo-500">Rem</span></span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-6 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors">Login</Link>
          <Link href="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tighter"
          >
            Never miss a <span className="gradient-text">special moment</span> again.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 mb-10 leading-relaxed"
          >
            The intuitive dashboard to track, manage, and celebrate the birthdays 
            of your loved ones with automated smart reminders.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register" className="btn-primary text-lg px-10">
              Create Your Free Account
            </Link>
            <Link href="#features" className="px-10 py-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all font-semibold">
              Explore Features
            </Link>
          </motion.div>
        </div>

        <div id="features" className="grid md:grid-cols-3 gap-8 mt-40">
          {[
            { icon: Bell, title: "Smart Reminders", desc: "Get daily email notifications for today's and upcoming birthdays." },
            { icon: Calendar, title: "Upcoming View", desc: "Easily see who's turning a year older in the next 30 days." },
            { icon: Shield, title: "Secure Storage", desc: "Your friends' data is encrypted and kept private just for you." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700">
                <feature.icon className="text-indigo-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
