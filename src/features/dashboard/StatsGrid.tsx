import React, { useCallback } from 'react';
import { Wallet, IndianRupee } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useFinancialStats } from '../../hooks/useFinancialStats';
import { CURRENCY } from '../../constants/config';
import { DataCard } from '../../components/common/DataCard';
import type { TransactionTypeFilter } from '../../types';

interface StatsGridProps {
  onNavigate?: (page: 'dashboard' | 'transactions') => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ onNavigate }) => {
  const { transactions, setTypeFilter, setFilter, setSearchQuery } = useDashboard();
  const { stats } = useFinancialStats(transactions);

  const handleCardClick = useCallback((type: TransactionTypeFilter) => {
    setTypeFilter(type);
    setFilter('All');
    setSearchQuery('');

    if (onNavigate) {
      onNavigate('transactions');
    } else {
      const tableSection = document.getElementById('transaction-table-section');
      if (tableSection) {
        tableSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [setTypeFilter, setFilter, setSearchQuery, onNavigate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DataCard
        title="Total Balance"
        value={`${CURRENCY} ${(stats.totalBalance || 0).toLocaleString()}`}
        change={stats.balanceChange}
        icon={Wallet}
        color="blue"
        delay={0}
        onClick={() => handleCardClick('all')}
      />
      <DataCard
        title="Monthly Income"
        value={`${CURRENCY} ${(stats.monthlyIncome || 0).toLocaleString()}`}
        change={stats.incomeChange}
        icon={IndianRupee}
        color="purple"
        delay={0.1}
        onClick={() => handleCardClick('income')}
      />
      <DataCard
        title="Monthly Expenses"
        value={`${CURRENCY} ${(stats.monthlyExpenses || 0).toLocaleString()}`}
        change={stats.expenseChange}
        icon={IndianRupee}
        color="amber"
        delay={0.2}
        onClick={() => handleCardClick('expense')}
      />
      <DataCard
        title="Net Savings"
        value={`${CURRENCY} ${((stats.monthlyIncome || 0) - (stats.monthlyExpenses || 0)).toLocaleString()}`}
        icon={IndianRupee}
        color="emerald"
        delay={0.3}
        size="large"
      />
    </div>
  );
};

