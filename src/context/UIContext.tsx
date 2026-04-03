import React, { createContext, useContext, useState, useCallback } from 'react';
import type { SortField, SortDirection, TransactionTypeFilter } from '../types';

interface UIContextType {
  filter: string;
  setFilter: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: SortField;
  setSortField: (field: SortField) => void;
  sortDirection: SortDirection;
  setSortDirection: (direction: SortDirection) => void;
  typeFilter: TransactionTypeFilter;
  setTypeFilter: (filter: TransactionTypeFilter) => void;
  monthFilter: string;
  setMonthFilter: (m: string) => void;
  dateFilter: string;
  setDateFilter: (d: string) => void;
  isFilterBarOpen: boolean;
  setIsFilterBarOpen: (b: boolean) => void;
  resetFilters: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>('all');
  const [monthFilter, setMonthFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [isFilterBarOpen, setIsFilterBarOpen] = useState<boolean>(true);

  const resetFilters = useCallback(() => {
    setFilter('All');
    setSearchQuery('');
    setTypeFilter('all');
    setMonthFilter('All');
    setDateFilter('');
  }, []);

  const value = {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    typeFilter,
    setTypeFilter,
    monthFilter,
    setMonthFilter,
    dateFilter,
    setDateFilter,
    isFilterBarOpen,
    setIsFilterBarOpen,
    resetFilters
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
