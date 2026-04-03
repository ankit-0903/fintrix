import { useMemo } from 'react';
import { subDays, startOfDay, parseISO } from 'date-fns';
import type { Transaction, SortField, SortDirection, TransactionTypeFilter } from '../types';

interface FilterState {
  filter: string;
  typeFilter: TransactionTypeFilter;
  monthFilter: string;
  dateFilter: string;
  searchQuery: string;
}

interface SortState {
  sortField: SortField;
  sortDirection: SortDirection;
}

interface UseFilteredTransactionsParams {
  transactions: Transaction[];
  filters: FilterState;
  sort: SortState;
  limitDays?: number;
}

export const useFilteredTransactions = ({
  transactions,
  filters,
  sort,
  limitDays
}: UseFilteredTransactionsParams): Transaction[] => {
  const { filter, typeFilter, monthFilter, dateFilter, searchQuery } = filters;
  const { sortField, sortDirection } = sort;

  return useMemo(() => {
    const filtered = transactions.filter(tx => {
      if (limitDays) {
        const txDate = parseISO(tx.date);
        const limitDate = startOfDay(subDays(new Date(), limitDays));
        if (txDate < limitDate) return false;
      }

      const matchCategory = filter === 'All' || tx.category === filter;
      const matchType = typeFilter === 'all' || tx.type === typeFilter;
      const matchSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());

      const txMonth = new Date(tx.date).toLocaleString('default', { month: 'short' });
      const matchMonth = monthFilter === 'All' || txMonth === monthFilter;

      const matchDate = !dateFilter || tx.date >= dateFilter;

      return matchCategory && matchType && matchSearch && matchMonth && matchDate;
    });

    filtered.sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (sortField === 'amount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [transactions, filter, typeFilter, monthFilter, dateFilter, searchQuery, sortField, sortDirection, limitDays]);
};
