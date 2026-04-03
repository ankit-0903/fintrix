import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { useTheme } from '../../context/ThemeContext';
import { User, Bell, Shield, Eye, Sun, Moon, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Header: React.FC = () => {
  const { role, setRole } = useDashboard();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between gap-6 px-6 py-4 bg-surface-card border-b border-border transition-colors duration-300 sticky top-0 z-30">
      {/* Sync Status & Last Update */}
      <div className="hidden md:flex items-center gap-6 animate-in fade-in slide-in-from-left-4 duration-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 leading-none">System Online</span>
            <span className="text-[9px] font-bold text-content-muted tracking-tighter mt-0.5 leading-none">Bank Feeds Active</span>
          </div>
        </div>

        <div className="h-4 w-px bg-border"></div>

        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary opacity-50" />
          <span className="text-[12px] font-black tracking-widest text-content-muted">
            Last Synced: <span className="text-content">2m ago</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        {/* Role Switcher */}
        <div className="flex items-center bg-surface p-1 rounded-xl border border-border">
          <button
            onClick={() => setRole('viewer')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              role === 'viewer' ? "bg-primary text-white shadow-md" : "text-content-muted hover:text-content hover:bg-surface-card"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            Viewer
          </button>
          <button
            onClick={() => setRole('admin')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
              role === 'admin' ? "bg-primary text-white shadow-md" : "text-content-muted hover:text-content hover:bg-surface-card"
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin
          </button>
        </div>

        {/* Notifications */}
        <button className="p-2 text-content-muted hover:text-content transition-colors relative group">
          <Bell className="w-5 h-5 group-hover:animate-bounce" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-secondary rounded-full border-2 border-surface-card"></span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 text-content-muted hover:text-content transition-all rounded-xl hover:bg-surface border border-transparent hover:border-border active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-content leading-tight">Alex Rivera</p>
            <p className="text-[10px] font-bold text-content-muted uppercase tracking-widest">{role} Account</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer group">
            <User className="w-6 h-6 text-content-muted group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};
