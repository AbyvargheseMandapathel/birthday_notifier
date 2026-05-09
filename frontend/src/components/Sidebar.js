"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Cake, 
  LayoutDashboard,
  Calendar, 
  Gift, 
  Settings, 
  LogOut,
  Users2,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Users2, label: 'People', href: '/people' },
  { icon: Gift, label: 'Gift Ideas', href: '/gifts' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
 const pathname = usePathname();
 const { logout } = useAuth();
 const [isCollapsed, setIsCollapsed] = useState(false);

 return (
 <motion.div 
 initial={false}
 animate={{ width: isCollapsed ? 72 : 220 }}
 className="min-h-screen bg-white dark:bg-[#080d1a] border-r border-zinc-100 dark:border-zinc-800/60 flex flex-col p-3 sticky top-0 transition-colors duration-300 overflow-hidden"
 >
  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-10 px-2`}>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
        <Cake className="text-white" size={18} />
      </div>
      {!isCollapsed && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight whitespace-nowrap"
        >
          BirthdayRemainder
        </motion.span>
      )}
    </div>
    {!isCollapsed && (
      <button 
        onClick={() => setIsCollapsed(true)}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-all ml-2"
      >
        <PanelLeftClose size={20} />
      </button>
    )}
  </div>

 {isCollapsed && (
 <div className="flex justify-center mb-6">
 <button 
 onClick={() => setIsCollapsed(false)}
 className="p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 transition-colors"
 >
 <PanelLeftOpen size={18} />
 </button>
 </div>
 )}

 <nav className="flex-1 space-y-1">
 {menuItems.map((item) => {
 const isActive = pathname === item.href;
 return (
 <Link 
 key={item.href}
 href={item.href}
 title={isCollapsed ? item.label : ""}
  className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-2.5 rounded-2xl transition-all duration-300 group ${
    isActive 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-white font-medium'
  }`}
>
  <item.icon size={20} className={`${isActive ? 'text-white' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'} shrink-0 transition-colors`} />
 {!isCollapsed && (
 <motion.span
 initial={{ opacity: 0, x: -10 }}
 animate={{ opacity: 1, x: 0 }}
 className="whitespace-nowrap"
 >
 {item.label}
 </motion.span>
 )}
 </Link>
 );
 })}
 </nav>

 <div className="mt-auto pt-4">
 {!isCollapsed ? (
 <motion.div 
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 className="bg-indigo-600 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:to-purple-900/30 rounded-3xl p-4 relative overflow-hidden mb-4 group cursor-pointer shadow-md dark:border dark:border-indigo-800/30"
 >
 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
 <div className="relative z-10 text-white">
 <p className="font-bold text-sm mb-1">Never miss a moment</p>
 <p className="text-[10px] text-indigo-100 dark:text-zinc-400 mb-4 leading-relaxed opacity-80">We'll remind you in advance, every time.</p>
 <button className="w-full py-2 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-colors">
 Invite Friends
 </button>
 </div>
 </motion.div>
 ) : (
 <div className="flex justify-center mb-4">
 <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 cursor-pointer hover:bg-indigo-100 transition-colors">
 <Gift size={20} />
 </div>
 </div>
 )}

 <button 
 onClick={logout}
 title={isCollapsed ? "Logout" : ""}
 className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-2.5 w-full text-zinc-500 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all duration-200`}
 >
 <LogOut size={20} className="shrink-0" />
 {!isCollapsed && <span className="font-medium">Logout</span>}
 </button>
 </div>
 </motion.div>
 );
}
