import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types';
import { storageService } from '../services/storageService';
import { CATEGORIES as INITIAL_CATEGORIES } from '../constants/config';

interface TransactionContextType {
  transactions: Transaction[];
  categories: string[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: string) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => storageService.getTransactions());
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);

  useEffect(() => {
    storageService.saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substring(2, 9),
    };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updatedFields: Partial<Transaction>) => {
    setTransactions(prev => prev.map(tx => (tx.id === id ? { ...tx, ...updatedFields } : tx)));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }, []);

  const addCategory = useCallback((category: string) => {
    setCategories(prev => {
      if (prev.includes(category)) return prev;
      return [...prev, category];
    });
  }, []);

  const value = {
    transactions,
    categories,
    addTransaction,
    editTransaction,
    deleteTransaction,
    addCategory
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
