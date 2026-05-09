"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Sidebar from '@/components/Sidebar';
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
      default: return <User size={14} className="text-slate-400" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">People</h1>
            <p className="text-slate-500 text-sm mt-1">All the important people in your life.</p>
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
        <div className="grid grid-cols-4 gap-6 mb-10">
            {[
                { label: 'Total People', value: people.length, icon: UsersIcon, color: 'indigo' },
                { label: 'Birthdays this month', value: '12', icon: Heart, color: 'pink' },
                { label: 'Family Members', value: '8', icon: User, color: 'amber' },
                { label: 'Friends', value: '15', icon: UsersIcon, color: 'emerald' },
            ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600`}>
                        <stat.icon size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search people..." 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        All Relationships <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter size={14} /> More Filters
                    </button>
                </div>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                        <th className="px-8 py-4">Name</th>
                        <th className="px-8 py-4">Birthday</th>
                        <th className="px-8 py-4">Relationship</th>
                        <th className="px-8 py-4">Group</th>
                        <th className="px-8 py-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {people.map((person) => (
                        <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold text-sm">
                                        {person.friend_name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">{person.friend_name}</p>
                                        <p className="text-[10px] text-slate-400">{person.contact_email || 'No email'}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-sm text-slate-600">
                                {new Date(2000, person.month - 1).toLocaleString('en-US', { month: 'short' })} {person.day}
                            </td>
                            <td className="px-8 py-5">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 rounded-full text-[10px] font-bold border border-slate-100">
                                    {getRelationshipIcon('friend')} Friend
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-[10px] font-bold">
                                    Friends
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {people.length === 0 && (
                <div className="py-20 text-center text-slate-400">
                    <UsersIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-medium">No people found yet.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
}
