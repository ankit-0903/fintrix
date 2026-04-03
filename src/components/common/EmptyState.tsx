import React from 'react';
import { Inbox, Filter, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  variant?: 'table' | 'chart' | 'default';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
  variant = 'default'
}) => {
  const isTable = variant === 'table';

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300",
      isTable ? "py-16" : "py-10 h-full w-full",
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 opacity-50" />
        <div className="relative w-16 h-16 bg-surface-card border border-border shadow-soft rounded-2xl flex items-center justify-center text-content-muted">
          <Icon className="w-8 h-8" />
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-content mb-2">{title}</h3>
      
      {description && (
        <p className="text-content-muted max-w-[280px] text-sm leading-relaxed mb-8">
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary/5 hover:bg-primary/10 text-primary font-bold text-sm rounded-xl border border-primary/20 transition-all active:scale-95"
        >
          {actionLabel === 'Reset' ? <Filter className="w-4 h-4" /> : null}
          {actionLabel}
        </button>
      )}
    </div>
  );
};
