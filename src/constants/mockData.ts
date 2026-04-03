import { subDays, subMonths, format } from 'date-fns';
import type { Transaction, ChartDataPoint } from '../types';

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), amount: 4500, category: 'Salary', type: 'income', description: 'Monthly Salary - TechCorp' },
    { id: '2', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), amount: 1200, category: 'Housing', type: 'expense', description: 'Monthly Rent' },
    { id: '3', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), amount: 285, category: 'Food', type: 'expense', description: 'Sushi Night' },
    { id: '4', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), amount: 95, category: 'Transit', type: 'expense', description: 'Gas Station' },
    { id: '5', date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), amount: 500, category: 'Freelance', type: 'income', description: 'Logo Design Project' },
    { id: '6', date: format(subDays(new Date(), 10), 'yyyy-MM-dd'), amount: 150, category: 'Media', type: 'expense', description: 'Concert Tickets' },
    { id: '7', date: format(subDays(new Date(), 12), 'yyyy-MM-dd'), amount: 430, category: 'Shopping', type: 'expense', description: 'New Headphones' },
    { id: '8', date: format(subDays(new Date(), 15), 'yyyy-MM-dd'), amount: 300, category: 'Investment', type: 'income', description: 'Dividend Payout' }
  ];

  for (let i = 1; i < 6; i++) {
    const date = subMonths(new Date(), i);
    transactions.push({ id: `old-${i}-1`, date: format(date, 'yyyy-MM-dd'), amount: 4500, category: 'Salary', type: 'income', description: 'Salary' });
    transactions.push({ id: `old-${i}-2`, date: format(subDays(date, 5), 'yyyy-MM-dd'), amount: 1200, category: 'Housing', type: 'expense', description: 'Rent' });
    transactions.push({ id: `old-${i}-3`, date: format(subDays(date, 10), 'yyyy-MM-dd'), amount: Math.floor(Math.random() * 200) + 600, category: 'Shopping', type: 'expense', description: 'Groceries & Retail' });
    transactions.push({ id: `old-${i}-4`, date: format(subDays(date, 15), 'yyyy-MM-dd'), amount: Math.floor(Math.random() * 150) + 400, category: 'Media', type: 'expense', description: 'Entertainment' });
    transactions.push({ id: `old-${i}-5`, date: format(subDays(date, 20), 'yyyy-MM-dd'), amount: 250, category: 'Health', type: 'expense', description: 'Pharmacy' });
  }
  return transactions;
};

export const MOCK_TRANSACTIONS = generateMockTransactions();

export const TREND_DATA: ChartDataPoint[] = [
  { month: 'Mon', balance: 14500, income: 24000, expense: 9500 },
  { month: 'Tue', balance: 15300, income: 25500, expense: 10200 },
  { month: 'Wed', balance: 16200, income: 27000, expense: 10800 },
  { month: 'Thu', balance: 17500, income: 29000, expense: 11500 },
  { month: 'Fri', balance: 16500, income: 29500, expense: 13000 },
  { month: 'Sat', balance: 16500, income: 30500, expense: 14000 },
  { month: 'Sun', balance: 17240, income: 31800, expense: 14560 },
];
