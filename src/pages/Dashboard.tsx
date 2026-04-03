import React, { useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { StatsGrid } from '../features/dashboard/StatsGrid';
import { TrendChart } from '../features/dashboard/TrendChart';
import { SpendChart } from '../features/dashboard/SpendChart';
import { TransactionTable } from '../features/transactions/TransactionTable';
import { InsightsPanel } from '../features/insights/InsightsPanel';
import {
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'transactions') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const currentDate = useMemo(() => format(new Date(), 'EEEE, MMMM d, yyyy'), []);

  return (
    <div className="flex flex-col min-h-screen ml-0 lg:ml-64 transition-all bg-surface overflow-x-hidden pb-12">
      <Header />

      <main className="flex-1 p-4 lg:p-8 animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-content leading-tight">
                Good Afternoon, <span className="text-primary font-black">Alex!</span>
              </h2>
              <p className="text-[11px] font-medium text-content-muted mt-1">
                {currentDate}
              </p>
            </div>
          </div>

          <StatsGrid onNavigate={onNavigate} />
          <InsightsPanel />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
            <div className="xl:col-span-2">
              <TrendChart />
            </div>
            <div className="xl:col-span-1">
              <SpendChart />
            </div>
          </div>

          <div id="transaction-table-section">
            <div className="flex items-center justify-between gap-6 mb-6">
              <div>
                <h3 className="font-bold text-2xl text-content leading-tight">Recent Activity</h3>
                <p className="text-xs text-content-muted mt-1 font-medium">Showing updates from the last 7 days</p>
              </div>

              <button
                onClick={() => onNavigate('transactions')}
                className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-black rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all active:scale-95"
              >
                <span>See All History</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <TransactionTable limitDays={7} />
          </div>
        </div>
      </main>
    </div>
  );
};
