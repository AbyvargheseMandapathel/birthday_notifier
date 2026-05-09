import { Search, Bell, Users } from 'lucide-react';

export default function DashboardHeader({ user, search, setSearch }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          {getGreeting()}, {user?.username || 'aby'}! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here's what's happening with your important people.</p>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative group flex-1 md:flex-none">
          <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all w-full md:w-64 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="p-2.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-sm transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.username}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pro Plan</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
