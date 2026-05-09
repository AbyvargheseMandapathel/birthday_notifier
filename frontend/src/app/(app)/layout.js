"use client";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-[#02040a] text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden">
      <Sidebar />
      {children}
    </div>
  );
}
