import React from 'react';
import { CreditCard, TrendingUp, ArrowUpRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboard } from '../../context/DashboardContext';
import { useFinancialStats } from '../../hooks/useFinancialStats';
import { CURRENCY } from '../../constants/config';

export const InsightsPanel: React.FC = () => {
  const { transactions } = useDashboard();
  const {
    savingsRate,
    topCategory,
    topCategoryPercent,
    projectedEOY,
    projectedGrowth
  } = useFinancialStats(transactions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Savings Rate Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
        className="bg-surface-card border border-border rounded-xl shadow-sm p-4 transition-all hover:shadow-lg flex flex-col group"
      >
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-110 transition-transform">
              <Target className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-content leading-tight">Savings Rate</h4>
              <p className="text-[10px] text-content-muted uppercase tracking-[0.05em] font-medium">Monthly</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 text-[11px] font-bold bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>On Track</span>
          </div>
        </div>
        <div className="h-px bg-border -mx-4 my-4" />

        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight text-content">{savingsRate}</span>
              <span className="text-xl font-bold text-blue-600">%</span>
            </div>
            <p className="text-xs text-content-muted/80 font-medium mt-1">
              You've saved a healthy portion of income
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-content-muted uppercase tracking-wider">
              <span>Progress to goal</span>
              <span className="text-content">59%</span>
            </div>
            <div className="h-1.5 bg-surface border border-border/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(savingsRate, 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]"
              />
            </div>
            <p className="text-[11px] text-content-muted leading-relaxed pt-2 italic opacity-80">
              Excellent! You're saving more than average developers.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Top Spend Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
        className="bg-surface-card border border-border rounded-xl shadow-sm p-4 transition-all hover:shadow-lg flex flex-col group"
      >
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-content leading-tight">Top Spend</h4>
              <p className="text-[10px] text-content-muted uppercase tracking-[0.05em] font-medium">Category</p>
            </div>
          </div>
          <div className="text-purple-600 text-[11px] font-bold bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-full">
            {topCategoryPercent}%
          </div>
        </div>
        <div className="h-px bg-border -mx-4 my-4" />

        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="text-3xl font-extrabold tracking-tight text-content mb-1">{topCategory.name}</h3>
            <p className="text-xs text-content-muted/80 font-medium italic">
              {CURRENCY} {topCategory.value.toLocaleString()} / month
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-content-muted uppercase tracking-wider">
              <span>Of total expenses</span>
              <span className="text-content">{topCategoryPercent}%</span>
            </div>
            <div className="h-1.5 bg-surface border border-border/40 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${topCategoryPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-purple-600 rounded-full shadow-[0_0_8px_rgba(147,51,234,0.3)]"
              />
            </div>
            <p className="text-[11px] text-content-muted leading-relaxed pt-2 italic opacity-80">
              {topCategory.name} accounts for {topCategoryPercent}% of total monthly spend.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Year-End Projection Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ y: -4, boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }}
        className="bg-surface-card border border-border rounded-xl shadow-sm p-4 transition-all hover:shadow-lg flex flex-col group"
      >
        <div className="flex items-center justify-between mb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h4 className="text-sm font-bold text-content leading-tight">Projected EOY</h4>
              <p className="text-[10px] text-content-muted uppercase tracking-[0.05em] font-medium">Year-{new Date().getFullYear()}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
            <ArrowUpRight className="w-3 h-3" />
            <span>+15%</span>
          </div>
        </div>
        <div className="h-px bg-border -mx-4 my-4" />

        <div className="flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-content-muted mr-1">{CURRENCY}</span>
              <span className="text-4xl font-extrabold tracking-tight text-content">{(projectedEOY / 1000).toFixed(1)}</span>
              <span className="text-xl font-bold text-content-muted ml-0.5">K</span>
            </div>
            <p className="text-xs text-content-muted/80 font-medium mt-1">
              Estimated net worth by Dec {new Date().getFullYear()}
            </p>
          </div>

          <div className="mt-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-content-muted uppercase tracking-wider">
              <span>Current → Projected</span>
              <span className="text-emerald-600">+{CURRENCY} {projectedGrowth.toLocaleString()}</span>
            </div>
            <div className="h-8 bg-surface rounded-lg flex items-end p-1 gap-1 overflow-hidden border border-border">
              <motion.div initial={{ height: 0 }} animate={{ height: '30%' }} transition={{ duration: 0.8, delay: 0.4 }} className="flex-1 bg-primary/20 rounded-sm" />
              <motion.div initial={{ height: 0 }} animate={{ height: '45%' }} transition={{ duration: 0.8, delay: 0.5 }} className="flex-1 bg-primary/40 rounded-sm" />
              <motion.div initial={{ height: 0 }} animate={{ height: '65%' }} transition={{ duration: 0.8, delay: 0.6 }} className="flex-1 bg-primary/60 rounded-sm" />
              <motion.div initial={{ height: 0 }} animate={{ height: '85%' }} transition={{ duration: 0.8, delay: 0.7 }} className="flex-1 bg-primary/80 rounded-sm" />
              <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 0.8, delay: 0.8 }} className="flex-1 bg-secondary rounded-sm" />
            </div>
            <p className="text-[11px] text-content-muted leading-relaxed pt-2 italic opacity-80">
              Projected net worth based on current growth trends.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
