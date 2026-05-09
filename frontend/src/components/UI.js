import { motion } from 'framer-motion';

export const Card = ({ children, className = '', title, action }) => (
 <div className={`bg-white dark:bg-zinc-900 rounded-[2rem] p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm ${className}`}>
 {(title || action) && (
 <div className="flex justify-between items-center mb-5">
 {title && <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{title}</h2>}
 {action && action}
 </div>
 )}
 {children}
 </div>
);

export const Avatar = ({ name, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm'
  };

  const getColors = (name) => {
    const colors = [
      'bg-rose-100/50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
      'bg-indigo-100/50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
      'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
      'bg-amber-100/50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
      'bg-sky-100/50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400',
      'bg-violet-100/50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
      'bg-orange-100/50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={`${sizes[size]} ${getColors(name)} rounded-2xl flex items-center justify-center font-bold shrink-0 border border-black/5 dark:border-white/5`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export const AvatarGroup = ({ users, limit = 3 }) => (
  <div className="flex -space-x-2">
    {users.slice(0, limit).map((u, i) => (
      <div key={i} className="border-2 border-white dark:border-zinc-900 rounded-xl overflow-hidden">
        <Avatar name={u.friend_name || u.username} size="sm" />
      </div>
    ))}
    {users.length > limit && (
      <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 rounded-xl flex items-center justify-center border-2 border-white dark:border-zinc-900">
        +{users.length - limit}
      </div>
    )}
  </div>
);

export const StatCard = ({ icon, label, value, sub, isPrimary = false, avatars = null }) => {
  const baseStyle = "rounded-[2rem] p-6 flex flex-col gap-3 justify-between transition-all hover:scale-[1.02] active:scale-[0.98] cursor-default";
  const primaryStyle = "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20";
  const secondaryStyle = "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white shadow-sm";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseStyle} ${isPrimary ? primaryStyle : secondaryStyle}`}
    >
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isPrimary ? 'bg-white/20 backdrop-blur-md' : 'bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700'}`}>
          {icon}
        </div>
        {avatars && <AvatarGroup users={avatars} />}
      </div>
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 ${isPrimary ? 'text-indigo-100' : 'text-zinc-400 dark:text-zinc-500'}`}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black leading-none tracking-tight">{value}</span>
        </div>
        <p className={`text-[10px] font-medium mt-2 ${isPrimary ? 'text-indigo-200' : 'text-zinc-400 dark:text-zinc-500'}`}>{sub}</p>
      </div>
    </motion.div>
  );
};

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
