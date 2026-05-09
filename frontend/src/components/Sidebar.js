"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Cake, 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Bell, 
  Gift, 
  BarChart3, 
  Settings, 
  LogOut,
  Users2
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Cake, label: 'Birthdays', href: '/birthdays' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Bell, label: 'Reminders', href: '/reminders' },
  { icon: Users2, label: 'People', href: '/people' },
  { icon: Gift, label: 'Gift Ideas', href: '/gifts' },
  { icon: BarChart3, label: 'Statistics', href: '/stats' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className="w-64 min-h-screen bg-white dark:bg-[#080d1a] border-r border-slate-100 dark:border-slate-800/60 flex flex-col p-6 sticky top-0 transition-colors duration-300">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Cake className="text-white" size={22} />
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">BirthdayRemainder</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              title={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive 
                ? 'bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm shadow-indigo-100 dark:shadow-none' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <item.icon size={20} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="bg-indigo-600 dark:bg-gradient-to-br dark:from-indigo-900/40 dark:to-purple-900/30 rounded-3xl p-6 relative overflow-hidden mb-6 group cursor-pointer shadow-xl shadow-indigo-500/20 dark:border dark:border-indigo-800/30">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-white/20 transition-all duration-500" />
            <div className="relative z-10 text-white">
                <p className="font-bold text-sm mb-1">Never miss a moment</p>
                <p className="text-[10px] text-indigo-100 dark:text-slate-400 mb-4 leading-relaxed opacity-80">We'll remind you in advance, every time.</p>
                <button className="w-full py-2 bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white text-xs font-bold rounded-xl shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-500 transition-colors">
                    Invite Friends
                </button>
            </div>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
