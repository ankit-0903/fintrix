import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

export type DataCardColor = 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo';

const colorClasses: Record<DataCardColor, { icon: string }> = {
  blue: { icon: 'bg-blue-50 text-blue-600 border-blue-100' },
  purple: { icon: 'bg-purple-50 text-purple-600 border-purple-100' },
  emerald: { icon: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  amber: { icon: 'bg-amber-50 text-amber-600 border-amber-100' },
  rose: { icon: 'bg-rose-50 text-rose-600 border-rose-100' },
  indigo: { icon: 'bg-indigo-50 text-indigo-600 border-indigo-100' }
};

interface DataCardProps extends Omit<HTMLMotionProps<"div">, 'title'> {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: DataCardColor;
  size?: 'default' | 'large';
  delay?: number;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'blue',
  size = 'default',
  delay = 0,
  className,
  onClick,
  ...props
}) => {
  const isPositive = change !== undefined && change >= 0;
  const colors = colorClasses[color];
  const isInteractive = !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={isInteractive ? { y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' } : undefined}
      className={cn(
        "bg-surface-card border border-border rounded-xl p-5 transition-all shadow-sm flex justify-between items-center relative overflow-hidden h-full group",
        isInteractive ? "cursor-pointer hover:border-secondary" : "cursor-default",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col h-full justify-center gap-2">
        <p className="text-[11px] font-bold text-content-muted uppercase tracking-[0.05em] whitespace-nowrap">{title}</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <h3 className={cn(
              "font-bold text-content tracking-tight transition-all",
              size === 'large' ? 'text-3xl' : 'text-xl'
            )}>{value}</h3>
          </div>
          {change !== undefined && change !== 0 && (
            <div className={cn(
              "flex items-center gap-0.5 text-[10px] font-bold",
              isPositive ? 'text-emerald-500' : 'text-rose-500'
            )}>
              {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>

      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center border border-transparent transition-transform group-hover:scale-110 shrink-0",
        colors.icon
      )}>
        <Icon className="w-6 h-6" />
      </div>
    </motion.div>
  );
};
