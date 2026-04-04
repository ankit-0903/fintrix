import React from 'react';
import {
  LayoutDashboard,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  Settings,
  Menu,
  X,
  LogOut,
  ReceiptText
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentPage: 'dashboard' | 'transactions';
  onNavigate: (page: 'dashboard' | 'transactions') => void;
}

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'transactions', icon: ReceiptText, label: 'Transactions' },
  { id: 'income', icon: ArrowUpRight, label: 'Income', disabled: true },
  { id: 'expenses', icon: ArrowDownLeft, label: 'Expenses', disabled: true },
  { id: 'insights', icon: PieChart, label: 'Insights', disabled: true },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      {!isOpen && (
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-surface-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-xl transition-all active:scale-95 animate-in fade-in zoom-in duration-300"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6 text-content" />
        </button>
      )}

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-surface/60 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-surface-card border-r border-border transition-all duration-300 lg:translate-x-0 outline-none shadow-2xl lg:shadow-none",
        !isOpen && "-translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6 relative">
          {/* Mobile Close Button */}
          <button
            className="lg:hidden absolute top-4 right-4 p-2 bg-surface border border-border rounded-xl text-content-muted hover:text-primary transition-all active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-10 overflow-hidden pr-8">
            <div className="flex flex-col min-w-0">
              <h1 className="text-3xl font-black tracking-tight text-content truncate">Fintrix</h1>
              <p className="text-[12px] font-bold italic text-content-muted tracking-widest truncate">Smart Financial Management</p>
            </div>
          </div>

          <nav className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.label}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.id === 'dashboard' || item.id === 'transactions') {
                      onNavigate(item.id as 'dashboard' | 'transactions');
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group outline-none text-left w-full",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : item.disabled 
                        ? "opacity-50 cursor-not-allowed text-content-muted"
                        : "text-content-muted hover:text-primary hover:bg-surface border border-transparent hover:border-border"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-content-muted group-hover:text-primary"
                  )} />
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex flex-col gap-2">
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-content-muted hover:text-primary hover:bg-surface transition-all group outline-none border border-transparent hover:border-border">
                <Settings className="w-5 h-5 text-content-muted group-hover:text-primary transition-transform duration-200 group-hover:scale-110" />
                <span className="font-bold text-sm tracking-tight">Settings</span>
              </button>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all group outline-none border border-transparent hover:border-rose-500/20">
                <LogOut className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="font-bold text-sm tracking-tight text-content-muted group-hover:text-rose-500">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
