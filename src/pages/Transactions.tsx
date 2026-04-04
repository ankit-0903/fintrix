import React from 'react';
import { Header } from '../components/layout/Header';
import { TransactionTable } from '../features/transactions/TransactionTable';
import { FilterBar } from '../features/transactions/FilterBar';
import { TransactionForm } from '../features/transactions/TransactionForm';
import {
  Search,
  Filter,
  FileText,
  Table as Sheet,
  Download
} from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { cn } from '../lib/utils';
import { downloadCSV, downloadExcel, downloadPDF } from '../lib/exportUtils';
import { useFilteredTransactions } from '../hooks/useFilteredTransactions';

export const Transactions: React.FC = () => {
  const {
    transactions,
    searchQuery,
    setSearchQuery,
    isFilterBarOpen,
    setIsFilterBarOpen,
    user,
    filter,
    typeFilter,
    monthFilter,
    dateFilter,
    sortField,
    sortDirection
  } = useDashboard();

  const filteredTransactions = useFilteredTransactions({
    transactions,
    filters: { filter, typeFilter, monthFilter, dateFilter, searchQuery },
    sort: { sortField, sortDirection }
  });

  return (
    <div className="flex flex-col min-h-screen ml-0 lg:ml-64 transition-all bg-surface overflow-x-hidden">
      <Header />

      <main className="flex-1 p-4 lg:p-8 animate-in fade-in duration-500">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black tracking-tight text-content leading-tight">
                Transaction History
              </h2>
              <p className="text-xs text-content-muted font-medium">Full historical record of all your financial movements</p>
            </div>
            <div className="shrink-0">
              <TransactionForm />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Search by description or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-2.5 bg-[#ebedf0] border-none rounded-full text-sm font-medium text-[#5c7089] placeholder:text-[#5c7089]/70 outline-none focus:ring-4 focus:ring-primary/5 transition-all w-80"
                />
              </div>

              <button
                onClick={() => setIsFilterBarOpen(!isFilterBarOpen)}
                className={cn(
                  "p-3 rounded-2xl transition-all border shrink-0",
                  isFilterBarOpen
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-95"
                    : "bg-surface text-content-muted border-border hover:border-primary/30"
                )}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <div className="hidden sm:flex items-center gap-2 mr-2 pr-4 border-r border-border">
                <span className="text-[10px] font-black uppercase text-content-muted tracking-widest">Export As</span>
              </div>

              <button
                onClick={() => downloadCSV(filteredTransactions, `Fintrix_Transactions_${new Date().toISOString().split('T')[0]}.csv`)}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs font-bold text-content hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95"
              >
                <Download className="w-4 h-4 text-blue-500" />
                <span>CSV</span>
              </button>

              <button
                onClick={() => downloadExcel(filteredTransactions, user)}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs font-bold text-content hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95"
              >
                <Sheet className="w-4 h-4 text-emerald-500" />
                <span>EXCEL</span>
              </button>

              <button
                onClick={() => downloadPDF(filteredTransactions, user)}
                className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-xl text-xs font-bold text-content hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-rose-500" />
                <span>PDF</span>
              </button>
            </div>
          </div>

          {isFilterBarOpen && (
            <div className="mb-8 animate-in slide-in-from-top-4 duration-300">
              <FilterBar />
            </div>
          )}

          <div className="mb-12">
            <TransactionTable />
          </div>
        </div>
      </main>
    </div>
  );
};
