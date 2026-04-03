import type { Transaction } from '../types';

export const transactionsToCSV = (transactions: Transaction[]): string => {
  const title = `Fintrix Financial Report - ${new Date().toLocaleDateString()}`;
  const headers = ['S.No', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((tx, index) => [
    index + 1,
    tx.date,
    tx.description.replace(/,/g, ' '),
    tx.category,
    tx.type,
    tx.amount
  ]);

  return [
    title,
    '',
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
};


export const downloadCSV = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  const csvContent = transactionsToCSV(transactions);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export const downloadExcel = (transactions: Transaction[], filename: string = 'transactions.csv') => {
  const csvContent = transactionsToCSV(transactions);

  const blob = new Blob(['\ufeff', csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const triggerPrint = () => {
  window.print();
};
