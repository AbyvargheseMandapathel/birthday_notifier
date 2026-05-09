import { Search, Bell, Users, Plus } from 'lucide-react';
import { useState } from 'react';

export default function DashboardHeader({ user, search, setSearch, totalContacts = 0, onQuickAdd }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const shouldCollapse = totalContacts < 15;

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2">
          {getGreeting()}, {user?.username || 'aby'}! 👋
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Here's what's happening with your important people.</p>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Search */}
        <div className="relative group flex items-center">
          {shouldCollapse && !isSearchExpanded ? (
            <button 
              onClick={() => setIsSearchExpanded(true)}
              className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-indigo-600 transition-all"
            >
              <Search size={20} />
            </button>
          ) : (
            <div className="relative flex items-center">
              <Search className="absolute left-3 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                autoFocus={isSearchExpanded}
                placeholder="Search..." 
                onBlur={() => shouldCollapse && setIsSearchExpanded(false)}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-full md:w-64 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Quick Add */}
        <button 
          onClick={onQuickAdd}
          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 shadow-md shadow-indigo-500/20 transition-all flex items-center gap-2"
          title="Quick Add Birthday"
        >
          <Plus size={20} />
          <span className="hidden lg:inline text-xs font-bold">Quick Add</span>
        </button>

        <button className="p-2.5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl text-zinc-400 hover:text-indigo-600 transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white dark:border-zinc-800"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">{user?.username}</p>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Pro Plan</p>
          </div>
          <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
            <Users size={20} className="text-zinc-500 dark:text-zinc-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
