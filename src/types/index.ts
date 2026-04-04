export type TransactionType = 'income' | 'expense';
export type UserRole = 'viewer' | 'admin';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
}
export type SortField = 'date' | 'amount' | 'category' | 'description';
export type SortDirection = 'asc' | 'desc';
export type TransactionTypeFilter = 'all' | 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export interface FinancialStats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  balanceChange: number;
  incomeChange: number;
  expenseChange: number;
}

export interface ChartDataPoint {
  month: string;
  balance: number;
  income: number;
  expense: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}
