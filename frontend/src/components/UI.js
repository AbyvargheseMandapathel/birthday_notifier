import { motion } from 'framer-motion';

export const Card = ({ children, className = '', title, action }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm shadow-slate-200/20 ${className}`}>
    {(title || action) && (
      <div className="flex justify-between items-center mb-8">
        {title && <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>}
        {action && action}
      </div>
    )}
    {children}
  </div>
);

export const StatCard = ({ icon, label, value, sub, bg }) => (
  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-50 dark:border-slate-800 shadow-sm shadow-slate-100/50 flex flex-col gap-4">
    <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center shadow-sm`}>
      {icon}
    </div>
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
      </div>
      <p className="text-[11px] font-bold text-slate-900 dark:text-white mt-1 uppercase tracking-wider">{label}</p>
      <p className="text-[10px] text-slate-400 font-medium">{sub}</p>
    </div>
  </div>
);

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-2xl font-bold transition-all'
  };
  
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
