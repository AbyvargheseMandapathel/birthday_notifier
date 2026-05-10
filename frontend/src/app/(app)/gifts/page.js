"use client";
import { useState, useEffect } from 'react';
import { Gift, ShoppingBag, Utensils, Ticket, Star, Search, Filter, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { voucherService } from '@/services/voucher';
import Image from 'next/image';

const ICON_MAP = {
  ShoppingBag: ShoppingBag,
  Utensils: Utensils,
  Ticket: Ticket,
  Star: Star,
  Gift: Gift
};

const CATEGORIES = ['All', 'Shopping', 'Food', 'Fashion', 'Entertainment', 'Gadgets'];

export default function GiftIdeasPage() {
  const { loading: authLoading } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    try {
      const data = await voucherService.getAll();
      setVouchers(data);
    } catch (err) {
      console.error("Failed to fetch vouchers", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredVouchers = vouchers.filter(v => 
    (activeCategory === 'All' || v.category === activeCategory) &&
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="animate-spin text-indigo-500" size={48} />
      </div>
    );
  }

  return (
    <main className="flex-1 p-4 lg:p-8 flex flex-col gap-8 relative overflow-y-auto h-full scrollbar-hide">
      {/* Hero Section */}
      <section className="relative h-[280px] rounded-[2.5rem] overflow-hidden flex items-center px-8 lg:px-12 shrink-0">
        <Image 
          src="/gift_vouchers_banner_1778395589065.png" 
          alt="Gift Vouchers" 
          fill 
          className="object-cover brightness-[0.4]"
        />
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="text-amber-400" /> Premium Selection
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Give the Gift of <span className="text-indigo-400 italic">Choice.</span>
          </h1>
          <p className="text-zinc-300 text-sm lg:text-base font-medium max-w-md">
            Never second-guess again. Send instant digital vouchers from the world's top brands directly to your friends.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20'
                  : 'bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-100 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-500/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </section>

      {/* Voucher Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
        <AnimatePresence mode='popLayout'>
          {filteredVouchers.map((voucher) => {
            const IconComponent = ICON_MAP[voucher.icon_type] || ShoppingBag;
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={voucher.id}
                className="group bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500"
              >
                <div 
                  className="h-24 p-6 flex justify-between items-start transition-all group-hover:h-32"
                  style={{ backgroundColor: `${voucher.brand_color}15` }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                    style={{ backgroundColor: voucher.brand_color }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white dark:bg-zinc-950/50 text-[10px] font-black tracking-tighter" style={{ color: voucher.brand_color }}>
                    {voucher.discount_text}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-xl text-zinc-900 dark:text-white tracking-tight">{voucher.name}</h3>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{voucher.category}</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                    {voucher.description}
                  </p>
                  <a 
                    href={voucher.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: `${voucher.brand_color}10`,
                      color: voucher.brand_color,
                    }}
                  >
                    Buy Voucher <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {filteredVouchers.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-50">
          <Search size={48} className="text-zinc-300 mb-4" />
          <p className="text-zinc-500 font-medium">No vouchers found matching your search.</p>
        </div>
      )}
    </main>
  );
}
