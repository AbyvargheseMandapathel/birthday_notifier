import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function CalendarCard({ birthdays }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const days = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);
  const padding = Array.from({ length: startDayOfMonth(month, year) }, (_, i) => null);

  const today = new Date();
  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const getBirthdaysOnDay = (d) => {
    if (!d) return [];
    return birthdays.filter(b => b.day === d && b.month === (month + 1));
  };

  const todayBirthdays = birthdays.filter(b => b.day === today.getDate() && b.month === (today.getMonth() + 1));

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{monthName} {year}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400"><ChevronLeft size={18} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-slate-400"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-4 text-center mb-8">
        {['S','M','T','W','T','F','S'].map(d => (
          <span key={d} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
        ))}
        
        {padding.map((_, i) => <div key={`p-${i}`} />)}
        
        {days.map(d => {
          const bdays = getBirthdaysOnDay(d);
          const hasBirthday = bdays.length > 0;
          const todayStyle = isToday(d) ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none' : 'text-slate-600 dark:text-slate-400';
          
          return (
            <div key={d} className={`text-xs p-2 rounded-xl flex items-center justify-center relative cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 ${todayStyle}`}>
              {d}
              {hasBirthday && !isToday(d) && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${bdays[0].color || 'bg-indigo-500'}`}></span>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs mb-6 text-slate-400">
          Today • <span className="text-slate-900 dark:text-white font-bold">{today.toLocaleString('default', { month: 'long' })} {today.getDate()}</span>
        </div>

        {todayBirthdays.length > 0 ? (
          todayBirthdays.map(b => (
            <div key={b.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center text-pink-600 font-bold">
                  {b.friend_name[0]}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">{b.friend_name}</h5>
                  <p className="text-[10px] text-slate-500 italic">Turning {b.age || '??'} today! 🎉</p>
                </div>
              </div>
              <button className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
                <Send size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-slate-400 italic">No birthdays today. Rest up! 😴</p>
          </div>
        )}
      </div>
    </div>
  );
}
