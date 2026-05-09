import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Calendar, Coffee } from 'lucide-react';

export default function CalendarCard({ birthdays, onEventClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const days = Array.from({ length: daysInMonth(month, year) }, (_, i) => i + 1);
  const padding = Array.from({ length: startDayOfMonth(month, year) }, (_, i) => null);

  const isToday = (d) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isSelected = (d) => d === selectedDay;

  const getBirthdaysOnDay = (d) => {
    if (!d) return [];
    return birthdays.filter(b => b.day === d && b.month === (month + 1));
  };

  const selectedBirthdays = getBirthdaysOnDay(selectedDay);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm flex-1 overflow-y-auto scrollbar-hide flex flex-col">
      <div className="flex justify-between items-center mb-4 shrink-0 px-2">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">{monthName} {year}</h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-zinc-400"><ChevronLeft size={18} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl text-zinc-400"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center mb-5 shrink-0">
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <span key={`${d}-${i}`} className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{d}</span>
        ))}
        
        {padding.map((_, i) => <div key={`p-${i}`} />)}
        
        {days.map(d => {
          const bdays = getBirthdaysOnDay(d);
          const hasBirthday = bdays.length > 0;
          const activeStyle = isSelected(d) 
            ? 'bg-indigo-600 text-white font-semibold shadow-sm' 
            : isToday(d)
              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 font-semibold'
              : 'text-zinc-600 dark:text-zinc-400';
          
          return (
            <div 
              key={d} 
              onClick={() => setSelectedDay(d)}
              className={`text-xs w-8 h-8 mx-auto rounded-xl flex items-center justify-center relative cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all ${activeStyle}`}
            >
              {d}
              {hasBirthday && (
                <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected(d) ? 'bg-white' : 'bg-indigo-500'}`}></span>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-5 border-t border-zinc-50 dark:border-zinc-800 mt-auto">
        <div className="flex items-center justify-between text-xs mb-3 text-zinc-400 shrink-0 px-2">
          <span className="flex items-center gap-2">
             <Calendar size={14} />
             {isToday(selectedDay) ? 'Today' : 'Selected'}
          </span>
          <span className="text-zinc-900 dark:text-white font-semibold">{monthName} {selectedDay}</span>
        </div>

        <div className="space-y-3 pr-1">
          {selectedBirthdays.length > 0 ? (
            selectedBirthdays.map(b => (
              <div 
                key={b.id} 
                onClick={() => onEventClick?.(b.id)}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all group border border-transparent hover:border-indigo-100/50 dark:hover:border-indigo-500/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-sm font-semibold shrink-0">
                    {b.friend_name[0]}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-sm font-semibold text-zinc-900 dark:text-white truncate leading-tight mb-0.5">{b.friend_name}</h5>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {isToday(selectedDay) ? `Turning ${b.age || '??'}! 🎉` : `Birthday Bash`}
                    </p>
                  </div>
                </div>
                <div className="p-2.5 text-zinc-400 group-hover:text-indigo-600 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-3 opacity-20">
                <Coffee size={24} />
              </div>
              <p className="text-xs text-zinc-400 italic">No events today. Relax!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
