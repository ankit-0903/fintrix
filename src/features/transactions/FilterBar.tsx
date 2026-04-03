import {
  Filter,
  X,
  RotateCcw
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import type { TransactionTypeFilter } from '../../types';
import { Dropdown } from '../../components/common/Dropdown';

export const FilterBar: React.FC = () => {
  const {
    filter,
    setFilter,
    typeFilter,
    setTypeFilter,
    monthFilter,
    setMonthFilter,
    resetFilters,
    setIsFilterBarOpen,
    categories
  } = useDashboard();

  const months = [
    'All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const types = [
    { value: 'all', label: 'All Transactions' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' }
  ];

  return (
    <div className="mb-0 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-surface-card border border-border/60 rounded-[32px] shadow-2xl p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3 px-6 py-2 border-r border-border/80 hidden xl:flex">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Filter className="w-4 h-4 text-primary" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-content">Filters</span>
        </div>

        <div className="grid grid-cols-1 md:flex flex-1 items-end gap-3 px-2 overflow-visible">
          <Dropdown
            label="Category"
            options={["All", ...categories]}
            value={filter}
            onChange={(val: string) => setFilter(val)}
            className="flex-1 lg:flex-none"
          />

          <Dropdown
            label="Type"
            options={types}
            value={typeFilter}
            onChange={(val: string) => setTypeFilter(val as TransactionTypeFilter)}
            className="flex-1 lg:flex-none"
          />

          <Dropdown
            label="Month"
            options={months}
            value={monthFilter}
            onChange={(val: string) => setMonthFilter(val)}
            className="flex-1 lg:flex-none"
          />
        </div>

        <div className="flex items-center gap-4 pl-6 border-l border-border/80 ml-auto mr-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-orange-500 hover:text-orange-600 transition-colors p-2.5 rounded-xl hover:bg-orange-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setIsFilterBarOpen(false)}
            className="p-2.5 hover:bg-surface border border-transparent hover:border-border rounded-xl text-content-muted hover:text-content transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
