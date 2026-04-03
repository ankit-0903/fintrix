import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { TransactionProvider, useTransactions } from './TransactionContext';
import { UIProvider, useUI } from './UIContext';

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <TransactionProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </TransactionProvider>
    </AuthProvider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboard = () => {
  const auth = useAuth();
  const transactions = useTransactions();
  const ui = useUI();

  return {
    ...auth,
    ...transactions,
    ...ui
  };
};
