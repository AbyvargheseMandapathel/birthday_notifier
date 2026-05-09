"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2, 
  Filter,
  Download,
  Users as UsersIcon,
  Heart,
  Briefcase,
  User,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PeoplePage() {
  const { user, loading: authLoading } = useAuth();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      fetchPeople();
    }
  }, [user]);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/birthdays/');
      setPeople(res.data.results || res.data);
    } catch (err) {
      console.error("Failed to fetch people", err);
    } finally {
      setLoading(false);
    }
  };

  const getRelationshipIcon = (rel) => {
    switch (rel?.toLowerCase()) {
      case 'family': return <Heart size={14} className="text-pink-500" />;
      case 'work': return <Briefcase size={14} className="text-blue-500" />;
      default: return <User size={14} className="text-zinc-400" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
      <main className="flex-1 p-8 relative overflow-y-auto h-full scrollbar-hide">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
          <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-[120px]" />
        </div>

        <header className="flex justify-between items-end mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">People</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">All the important people in your life.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="btn-secondary flex items-center gap-2 py-2.5 text-sm">
                <Download size={18} /> Import
             </button>
             <button className="btn-primary flex items-center gap-2 py-2.5 text-sm">
                <Plus size={18} /> Add Person
             </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-4 gap-6 mb-10 relative z-10">
            {[
                { label: 'Total People', value: people.length, icon: UsersIcon, color: 'indigo' },
                { label: 'Birthdays this month', value: people.filter(p => p.month === new Date().getMonth() + 1).length, icon: Heart, color: 'pink' },
                { label: 'Upcoming', value: people.filter(p => p.month >= new Date().getMonth() + 1).length, icon: User, color: 'amber' },
                { label: 'Added Recently', value: people.length > 5 ? 5 : people.length, icon: UsersIcon, color: 'emerald' },
            ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${stat.color}-50 dark:bg-${stat.color}-500/10 rounded-2xl flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400`}>
                        <stat.icon size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden relative z-10">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/30 dark:bg-zinc-800/20">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-2.5 text-zinc-400 dark:text-zinc-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search people..." 
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all text-zinc-900 dark:text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        All Relationships <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        <Filter size={14} /> More Filters
                    </button>
                </div>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-50 dark:border-zinc-800">
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Birthday</th>
                        <th className="px-8 py-4">Relationship</th>
                        <th className="px-8 py-4">Group</th>
                        <th className="px-8 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                    {people.map((person) => (
                        <tr key={person.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 font-bold text-sm">
                                        {person.friend_name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900 dark:text-white">{person.friend_name}</p>
                                        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{person.contact_email || 'No email'}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-sm text-zinc-600 dark:text-zinc-400">
                                {new Date(2000, person.month - 1).toLocaleString('en-US', { month: 'short' })} {person.day}
                            </td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[10px] font-bold border border-zinc-100 dark:border-zinc-700">
                                    {getRelationshipIcon('friend')} Friend
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-bold">
                                    Friends
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {people.length === 0 && (
                <div className="py-20 text-center text-zinc-400">
                    <UsersIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-medium">No people found yet.</p>
                </div>
            )}
        </div>
      </main>
  );
}
