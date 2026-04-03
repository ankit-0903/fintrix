import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import {
  Trash2,
  ArrowUpDown,
  Search
} from 'lucide-react';
import { CURRENCY } from '../../constants/config';
import type { SortField } from '../../types';
import { cn } from '../../lib/utils';
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions';
import { Pagination } from '../../components/common/Pagination';
import { SortableHeader } from './SortableHeader';
import { EmptyState } from '../../components/common/EmptyState';

interface TransactionTableProps {
  limitDays?: number;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ limitDays }) => {
  const {
    transactions,
    deleteTransaction,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortField,
    sortDirection,
    setSortField,
    setSortDirection,
    typeFilter,
    setTypeFilter,
    monthFilter,
    dateFilter
  } = useDashboard();

  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const ITEMS_PER_PAGE = 10;

  const filteredAndSortedTransactions = useFilteredTransactions({
    transactions,
    filters: { filter, typeFilter, monthFilter, dateFilter, searchQuery },
    sort: { sortField, sortDirection },
    limitDays
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filteredAndSortedTransactions.length]);

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredAndSortedTransactions.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredAndSortedTransactions.map(tx => tx.id)));
    }
  };

  const handleBulkDelete = () => {
    const count = selectedIds.size;
    if (window.confirm(`Are you sure you want to delete ${count} selected transactions?`)) {
      selectedIds.forEach(id => deleteTransaction(id));
      setSelectedIds(new Set());
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 mb-2">
        <div className="flex items-center gap-2 text-content-muted animate-in fade-in duration-700">
          <ArrowUpDown className="w-4 h-4 text-primary" />
          <p className="text-[12px] font-bold uppercase tracking-widest">
            Click on column headers to sort transactions
          </p>
        </div>

        {selectedIds.size > 0 && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white text-xs font-black rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete Selected ({selectedIds.size})
            </button>
          </div>
        )}
      </div>

      <div className="bg-surface-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-nowrap">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white text-[13px] font-black uppercase tracking-wider">
                <th className="pl-6 py-5 w-12 align-middle">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-white/20 bg-white/10 checked:bg-white checked:text-primary transition-all cursor-pointer accent-white"
                      checked={selectedIds.size === filteredAndSortedTransactions.length && filteredAndSortedTransactions.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </div>
                </th>
                <th className="px-4 py-5 align-middle">
                  <div className="flex items-center h-full">S.NO.</div>
                </th>
                
                <SortableHeader
                  label="Transaction"
                  field="description"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Category"
                  field="category"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Date"
                  field="date"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />

                <SortableHeader
                  label="Amount"
                  field="amount"
                  currentSortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  align="right"
                />

                <th className="px-6 py-5 align-middle text-right">
                  <div className="flex items-center justify-end h-full">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 bg-surface/30">
                    <EmptyState
                      variant="table"
                      icon={Search}
                      title="No transactions found"
                      description="Adjust your filters or search query to find what you're looking for."
                      actionLabel="Reset"
                      onAction={() => {
                        setFilter('All');
                        setTypeFilter('all');
                        setSearchQuery('');
                      }}
                    />
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((tx, index) => (
                  <tr
                    key={tx.id}
                    className={cn(
                      "hover:bg-surface/50 transition-colors group",
                      selectedIds.has(tx.id) && "bg-primary/5"
                    )}
                  >
                    <td className="pl-6 py-5 align-middle">
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-border bg-surface checked:bg-primary transition-all cursor-pointer accent-primary"
                        checked={selectedIds.has(tx.id)}
                        onChange={() => toggleSelect(tx.id)}
                      />
                    </td>
                    <td className="px-4 py-5 align-middle text-sm font-bold text-content-muted/60">
                      {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                    </td>
                    <td className="px-6 py-5 align-middle">
                      <div className="flex flex-col justify-center">
                        <span className="font-bold text-[15px] text-content leading-tight">{tx.description}</span>
                        <span className="text-[11px] font-black uppercase text-content-muted tracking-tight opacity-70 italic mt-0.5">{tx.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-middle">
                      <span className="text-sm font-bold text-content-muted/80">{tx.category}</span>
                    </td>
                    <td className="px-6 py-5 align-middle text-sm font-bold text-content-muted/70">{tx.date}</td>
                    <td className={cn(
                      "px-6 py-5 align-middle text-right font-black text-[16px] tabular-nums",
                      tx.type === 'income' ? "text-emerald-500" : "text-content"
                    )}>
                      {tx.type === 'income' ? '+' : '-'}{CURRENCY} {tx.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 align-middle text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this transaction?')) deleteTransaction(tx.id);
                          }}
                          className="p-2.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90 cursor-pointer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={filteredAndSortedTransactions.length}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
