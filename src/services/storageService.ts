import { STORAGE_KEYS } from '../constants/config';
import { MOCK_TRANSACTIONS } from '../constants/mockData';
import type { Transaction } from '../types';

export const storageService = {
  getTransactions: (): Transaction[] => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (!saved) return MOCK_TRANSACTIONS;
      
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      
      console.warn('Invalid transactions data in storage, falling back to mocks');
      return MOCK_TRANSACTIONS;
    } catch (error) {
      console.error('Failed to load transactions from localStorage:', error);
      return MOCK_TRANSACTIONS;
    }
  },

  saveTransactions: (transactions: Transaction[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    } catch (error) {
      console.error('Failed to save transactions to localStorage:', error);
    }
  }
};
