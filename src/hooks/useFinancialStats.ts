import { useMemo } from 'react';
import type { Transaction, FinancialStats, CategoryDataPoint } from '../types';
import { CHART_COLORS } from '../constants/config';

export const useFinancialStats = (transactions: Transaction[]) => {
  return useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const totalBalance = income - expenses;
    const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;

    const categories: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      });

    let categoryData: CategoryDataPoint[] = Object.entries(categories)
      .map(([name, value]) => ({ name, value, color: '' }))
      .sort((a, b) => b.value - a.value);

    if (categoryData.length > 3) {
      const top3 = categoryData.slice(0, 3);
      const othersValue = categoryData.slice(3).reduce((sum, item) => sum + item.value, 0);

      if (othersValue > 0) {
        categoryData = [...top3, { name: 'Others', value: othersValue, color: CHART_COLORS.rose }];
      }
    }


    const colorValues = Object.values(CHART_COLORS).filter(c => c !== CHART_COLORS.rose);
    categoryData = categoryData.map((item, index) => ({
      ...item,
      color: item.color || colorValues[index % colorValues.length],
    }));

    const topCategory = categoryData[0] || { name: 'None', value: 0 };
    const topCategoryPercent = expenses > 0 ? Math.round((topCategory.value / expenses) * 100) : 0;
    const monthlyNet = income - expenses;
    const projectedGrowth = monthlyNet * 12;
    const projectedEOY = totalBalance + projectedGrowth;

    const stats: FinancialStats = {
      totalBalance,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      balanceChange: 12.5,
      incomeChange: 8.2,
      expenseChange: -4.3,
    };

    return {
      stats,
      savingsRate,
      categoryData,
      topCategory,
      topCategoryPercent,
      projectedEOY,
      projectedGrowth,
    };
  }, [transactions]);
};
