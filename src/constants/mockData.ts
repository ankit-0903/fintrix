import { subDays, subMonths, format } from 'date-fns';
import type { Transaction, ChartDataPoint } from '../types';

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    { id: '1', date: format(new Date(), 'yyyy-MM-dd'), amount: 75000, category: 'Salary', type: 'income', description: 'Monthly Salary - Reliance Industries' },
    { id: '2', date: format(subDays(new Date(), 2), 'yyyy-MM-dd'), amount: 22000, category: 'Housing', type: 'expense', description: '2BHK Apartment Rent' },
    { id: '3', date: format(subDays(new Date(), 3), 'yyyy-MM-dd'), amount: 850, category: 'Food', type: 'expense', description: 'Zomato - Behrouz Biryani' },
    { id: '4', date: format(subDays(new Date(), 5), 'yyyy-MM-dd'), amount: 3500, category: 'Transit', type: 'expense', description: 'Indian Oil - Petrol Refill' },
    { id: '5', date: format(subDays(new Date(), 7), 'yyyy-MM-dd'), amount: 12000, category: 'Freelance', type: 'income', description: 'Web Dev Project - IndianSaaS' },
    { id: '6', date: format(subDays(new Date(), 10), 'yyyy-MM-dd'), amount: 450, category: 'Media', type: 'expense', description: 'Netflix & Hotstar Subscription' },
    { id: '7', date: format(subDays(new Date(), 12), 'yyyy-MM-dd'), amount: 2400, category: 'Shopping', type: 'expense', description: 'Myntra - Fashion Order' },
    { id: '8', date: format(subDays(new Date(), 15), 'yyyy-MM-dd'), amount: 5000, category: 'Investment', type: 'income', description: 'SIP Dividend - HDFC Mutual Fund' }
  ];

  for (let i = 1; i < 6; i++) {
    const date = subMonths(new Date(), i);
    transactions.push({ id: `old-${i}-1`, date: format(date, 'yyyy-MM-dd'), amount: 75000, category: 'Salary', type: 'income', description: 'Salary' });
    transactions.push({ id: `old-${i}-2`, date: format(subDays(date, 5), 'yyyy-MM-dd'), amount: 22000, category: 'Housing', type: 'expense', description: 'Rent' });
    transactions.push({ id: `old-${i}-3`, date: format(subDays(date, 10), 'yyyy-MM-dd'), amount: Math.floor(Math.random() * 2000) + 5000, category: 'Shopping', type: 'expense', description: 'BigBasket - Groceries' });
    transactions.push({ id: `old-${i}-4`, date: format(subDays(date, 15), 'yyyy-MM-dd'), amount: Math.floor(Math.random() * 1500) + 1000, category: 'Media', type: 'expense', description: 'Entertainment & Recharges' });
    transactions.push({ id: `old-${i}-5`, date: format(subDays(date, 20), 'yyyy-MM-dd'), amount: 1500, category: 'Health', type: 'expense', description: 'Apollo Pharmacy' });
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
