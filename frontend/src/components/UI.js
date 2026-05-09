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
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const getColors = (name) => {
    const colors = [
      'bg-rose-100 text-rose-600',
      'bg-indigo-100 text-indigo-600',
      'bg-emerald-100 text-emerald-600',
      'bg-amber-100 text-amber-600',
      'bg-sky-100 text-sky-600',
      'bg-violet-100 text-violet-600',
      'bg-orange-100 text-orange-600'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={`${sizes[size]} ${getColors(name)} rounded-xl flex items-center justify-center font-semibold shrink-0`}>
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
  const baseStyle = "rounded-2xl p-4 flex flex-col gap-3 justify-between transition-all";
  const primaryStyle = "bg-indigo-600 text-white shadow-lg";
  const secondaryStyle = "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-white";

  return (
    <div className={`${baseStyle} ${isPrimary ? primaryStyle : secondaryStyle}`}>
      <div className="flex justify-between items-start">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isPrimary ? 'bg-white/20' : 'bg-zinc-50 dark:bg-zinc-800'}`}>
          {icon}
        </div>
        {avatars && <AvatarGroup users={avatars} />}
      </div>
      <div>
        <p className={`text-[11px] font-medium uppercase tracking-wider mb-1 ${isPrimary ? 'text-indigo-200' : 'text-zinc-500 dark:text-zinc-400'}`}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold leading-none">{value}</span>
        </div>
        <p className={`text-xs mt-1 ${isPrimary ? 'text-indigo-200' : 'text-zinc-400'}`}>{sub}</p>
      </div>
    </div>
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
