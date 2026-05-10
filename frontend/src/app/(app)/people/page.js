"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { birthdayService } from '@/services/birthday';
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
  X,
  ChevronDown,
  Mail,
  Calendar as CalendarIcon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/UI';

export default function PeoplePage() {
  const { user, loading: authLoading } = useAuth();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingPerson, setEditingPerson] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchPeople();
    }
  }, [user]);

  const fetchPeople = async () => {
    setLoading(true);
    try {
      const data = await birthdayService.getAll();
      setPeople(data);
    } catch (err) {
      console.error("Failed to fetch people", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this person?")) return;
    try {
      await birthdayService.delete(id);
      setPeople(people.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (person) => {
    setEditingPerson({ ...person });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const data = {
        friend_name: editingPerson.friend_name,
        contact_email: editingPerson.contact_email,
        day: parseInt(editingPerson.day),
        month: parseInt(editingPerson.month),
        relationship: editingPerson.relationship,
        group: editingPerson.group,
        notes: editingPerson.notes
      };

      if (editingPerson.id) {
        const updated = await birthdayService.update(editingPerson.id, data);
        setPeople(people.map(p => p.id === updated.id ? updated : p));
      } else {
        const created = await birthdayService.add(data);
        setPeople([created, ...people]);
      }
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Operation failed", err);
    } finally {
      setFormLoading(false);
    }
  };

  const getRelationshipIcon = (rel) => {
    switch (rel?.toLowerCase()) {
      case 'family': return <Heart size={14} className="text-rose-500" />;
      case 'work': return <Briefcase size={14} className="text-blue-500" />;
      case 'friend': return <UsersIcon size={14} className="text-emerald-500" />;
      default: return <User size={14} className="text-zinc-400" />;
    }
  };

  const filteredPeople = people.filter(p => 
    p.friend_name.toLowerCase().includes(search.toLowerCase()) ||
    p.contact_email?.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
      <main className="flex-1 p-4 lg:p-8 relative overflow-y-auto h-full scrollbar-hide">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
          <div className="absolute top-[-10%] right-[10%] w-[50%] h-[50%] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[140px]" />
        </div>

        <header className="flex justify-between items-end mb-10 relative z-10">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">People</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">All the important people in your life.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-2">
                <Download size={18} /> Import
             </button>
             <button 
                onClick={() => { setEditingPerson({ friend_name: '', relationship: 'friend', group: 'Friends', month: 1, day: 1, contact_email: '', notes: '' }); setIsEditModalOpen(true); }}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2"
              >
                <Plus size={18} /> Add Person
             </button>
          </div>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 relative z-10">
            {[
                { label: 'Total People', value: people.length, icon: UsersIcon, color: 'indigo' },
                { label: 'Birthdays this month', value: people.filter(p => p.month === new Date().getMonth() + 1).length, icon: Heart, color: 'rose' },
                { label: 'Upcoming', value: people.filter(p => p.days_until < 30).length, icon: CalendarIcon, color: 'amber' },
                { label: 'Added Recently', value: people.length > 5 ? 5 : people.length, icon: Sparkles, color: 'emerald' },
            ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: `${stat.color === 'indigo' ? '#6366f1' : stat.color === 'rose' ? '#f43f5e' : stat.color === 'amber' ? '#f59e0b' : '#10b981'}15`, color: stat.color === 'indigo' ? '#6366f1' : stat.color === 'rose' ? '#f43f5e' : stat.color === 'amber' ? '#f59e0b' : '#10b981' }}>
                        <stat.icon size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">{stat.value}</p>
                        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden relative z-10">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50/30 dark:bg-zinc-800/20">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 text-zinc-400 dark:text-zinc-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search people..." 
                        className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:focus:ring-indigo-500/5 transition-all text-zinc-900 dark:text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        All Relationships <ChevronDown size={14} />
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                        <Filter size={14} /> More Filters
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
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
                        {filteredPeople.map((person) => (
                            <tr key={person.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-bold text-sm">
                                            {person.friend_name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 dark:text-white leading-tight">{person.friend_name}</p>
                                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{person.contact_email || 'No email'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-sm text-zinc-600 dark:text-zinc-400">
                                    {new Date(2000, person.month - 1).toLocaleString('en-US', { month: 'short' })} {person.day}
                                </td>
                                <td className="px-8 py-5">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-[10px] font-bold border border-zinc-100 dark:border-zinc-700 capitalize">
                                        {getRelationshipIcon(person.relationship)} {person.relationship || 'Friend'}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-bold">
                                        {person.group || 'Friends'}
                                    </span>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEdit(person)}
                                            className="p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(person.id)}
                                            className="p-2 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredPeople.length === 0 && (
                <div className="py-20 text-center text-zinc-400">
                    <UsersIcon size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="font-medium">No people found.</p>
                </div>
            )}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-white dark:bg-zinc-900 w-full max-w-lg p-8 rounded-[2.5rem] shadow-2xl relative z-10 border border-white/50 dark:border-zinc-800" >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                {editingPerson.id ? 'Edit Person' : 'Add New Person'}
                            </h2>
                            <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all"><X size={24} /></button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Friend's Name</label>
                                <input type="text" required className="input-field" value={editingPerson.friend_name} onChange={(e) => setEditingPerson({...editingPerson, friend_name: e.target.value})} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Relationship</label>
                                    <select className="input-field py-2 text-sm" value={editingPerson.relationship} onChange={(e) => setEditingPerson({...editingPerson, relationship: e.target.value})}>
                                        <option value="friend">Friend</option>
                                        <option value="family">Family</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Group</label>
                                    <input type="text" className="input-field" value={editingPerson.group} onChange={(e) => setEditingPerson({...editingPerson, group: e.target.value})} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Month</label>
                                    <select className="input-field py-2 text-sm" value={editingPerson.month} onChange={(e) => setEditingPerson({...editingPerson, month: e.target.value})}>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>{new Date(2000, i).toLocaleString('en-US', { month: 'long' })}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Day</label>
                                    <input type="number" min="1" max="31" className="input-field" value={editingPerson.day} onChange={(e) => setEditingPerson({...editingPerson, day: e.target.value})} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider ml-1">Email</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                                    <input type="email" className="input-field pl-11" value={editingPerson.contact_email || ''} onChange={(e) => setEditingPerson({...editingPerson, contact_email: e.target.value})} />
                                </div>
                            </div>

                            <Button type="submit" disabled={formLoading} className="w-full py-4 shadow-xl">
                                {formLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Update Person"}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </main>
  );
}
