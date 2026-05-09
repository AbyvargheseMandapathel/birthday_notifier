"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Cake, Calendar, Plus, Search, LogOut, Bell, Edit2, Trash2, Loader2, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const { user, logout, loading: authLoading } = useAuth();
  const [upcoming, setUpcoming] = useState([]);
  const [allBirthdays, setAllBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  // Form state
  const [friendName, setFriendName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [includeYear, setIncludeYear] = useState(true);
  const [notes, setNotes] = useState('');
  const [email, setEmail] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [upcomingRes, allRes] = await Promise.all([
        api.get('/api/birthdays/upcoming/'),
        api.get('/api/birthdays/')
      ]);
      setUpcoming(upcomingRes.data);
      setAllBirthdays(allRes.data.results || allRes.data);
    } catch (err) {
      console.error("Failed to fetch birthdays", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBirthday = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await api.post('/api/birthdays/', {
        friend_name: friendName,
        day: parseInt(day),
        month: parseInt(month),
        year: includeYear && year ? parseInt(year) : null,
        notes,
        contact_email: email
      });
      setIsAddModalOpen(false);
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Add failed", err);
      alert("Failed to add birthday. Please check the values.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this birthday?")) {
      try {
        await api.delete(`/api/birthdays/${id}/`);
        fetchData();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const resetForm = () => {
    setFriendName('');
    setDay('');
    setMonth('');
    setYear('');
    setIncludeYear(true);
    setNotes('');
    setEmail('');
  };

  const getMonthName = (m) => {
    return new Date(2000, m - 1).toLocaleString('en-US', { month: 'long' });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  const filteredBirthdays = allBirthdays.filter(b => 
    b.friend_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cake className="text-indigo-500" size={28} />
            <span className="text-xl font-bold">Birthday<span className="text-indigo-500">Rem</span></span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-sm hidden md:block">Welcome, {user?.username}</span>
            <button onClick={logout} className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        <section className="mb-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">Dashboard</h1>
              <p className="text-slate-400">Stay updated on your upcoming celebrations</p>
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="btn-primary flex items-center gap-2">
              <Plus size={20} />
              Add Birthday
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Bell size={20} className="text-pink-500" />
            Upcoming Birthdays
          </h2>
          
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((bday, idx) => (
                <motion.div 
                  key={bday.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass p-6 rounded-3xl relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">{bday.friend_name}</h3>
                      {bday.age_turning && (
                        <p className="text-indigo-400 font-medium">Turning {bday.age_turning}</p>
                      )}
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-bold text-indigo-400">
                      In {bday.days_until} days
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                    <Calendar size={14} />
                    {getMonthName(bday.month)} {bday.day}{bday.year ? `, ${bday.year}` : ''}
                  </div>
                  {bday.notes && <p className="text-slate-500 text-sm line-clamp-2 italic">"{bday.notes}"</p>}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl text-center border-dashed border-2 border-slate-800">
              <Calendar className="mx-auto mb-4 text-slate-700" size={48} />
              <p className="text-slate-500">No birthdays in the next 30 days.</p>
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-xl font-semibold w-full">All Birthdays</h2>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-3 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search friends..." 
                className="input-field pl-12 py-2.5"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="glass rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-4 font-semibold text-slate-400 text-sm">NAME</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-sm">BIRTH DATE</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-sm">AGE</th>
                  <th className="px-6 py-4 font-semibold text-slate-400 text-sm">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredBirthdays.map((bday) => (
                  <tr key={bday.id} className="hover:bg-slate-900/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold">{bday.friend_name}</div>
                      <div className="text-xs text-slate-500">{bday.contact_email || 'No email'}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {getMonthName(bday.month)} {bday.day}{bday.year ? `, ${bday.year}` : ''}
                    </td>
                    <td className="px-6 py-4 text-indigo-400 font-medium">
                      {bday.age_turning || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(bday.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="glass w-full max-w-lg p-8 rounded-3xl relative z-10" >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Add New Birthday</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
              </div>

              <form onSubmit={handleAddBirthday} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Friend's Name</label>
                  <input type="text" required className="input-field" placeholder="Enter name" value={friendName} onChange={(e) => setFriendName(e.target.value)} />
                </div>

                <div className="space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-300">Birthday Details</label>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="includeYear" checked={includeYear} onChange={(e) => setIncludeYear(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
                      <label htmlFor="includeYear" className="text-xs text-slate-400">Know the year?</label>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Month</label>
                      <select required className="input-field py-2 text-sm" value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option value="">Select</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>{getMonthName(i + 1)}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500 font-bold ml-1">Day</label>
                      <input type="number" required min="1" max="31" className="input-field py-2 text-sm" placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[10px] uppercase tracking-wider font-bold ml-1 ${includeYear ? 'text-slate-500' : 'text-slate-700'}`}>Year</label>
                      <input type="number" disabled={!includeYear} min="1900" max={new Date().getFullYear()} className="input-field py-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Contact Email (Optional)</label>
                  <input type="email" className="input-field" placeholder="friend@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Notes (Optional)</label>
                  <textarea className="input-field min-h-[80px] resize-none" placeholder="Special gift ideas or notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <button type="submit" disabled={formLoading} className="btn-primary w-full flex items-center justify-center gap-2">
                  {formLoading ? <Loader2 className="animate-spin" size={20} /> : "Save Birthday"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
