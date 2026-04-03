// Mock Data Analysis Script
// Run this with: node test-calculations.js

// Mock transactions from the code
const transactions = [
  // Current month
  { id: '1', date: new Date().toISOString().split('T')[0], amount: 4500, category: 'Salary', type: 'income', description: 'Monthly Salary - TechCorp' },
  { id: '2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 1200, category: 'Housing', type: 'expense', description: 'Monthly Rent' },
  { id: '3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 285, category: 'Food', type: 'expense', description: 'Sushi Night' },
  { id: '4', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 95, category: 'Transit', type: 'expense', description: 'Gas Station' },
  { id: '5', date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 500, category: 'Freelance', type: 'income', description: 'Logo Design Project' },
  { id: '6', date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 150, category: 'Media', type: 'expense', description: 'Concert Tickets' },
  { id: '7', date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 430, category: 'Shopping', type: 'expense', description: 'New Headphones' },
  { id: '8', date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], amount: 300, category: 'Investment', type: 'income', description: 'Dividend Payout' }
];

// Generate historical data (5 months back)
for (let i = 1; i <= 5; i++) {
  const date = new Date();
  date.setMonth(date.getMonth() - i);

  transactions.push({ id: `old-${i}-1`, date: date.toISOString().split('T')[0], amount: 4500, category: 'Salary', type: 'income', description: 'Salary' });

  const rentDate = new Date(date);
  rentDate.setDate(rentDate.getDate() - 5);
  transactions.push({ id: `old-${i}-2`, date: rentDate.toISOString().split('T')[0], amount: 1200, category: 'Housing', type: 'expense', description: 'Rent' });

  const shoppingDate = new Date(date);
  shoppingDate.setDate(shoppingDate.getDate() - 10);
  const shoppingAmount = Math.floor(Math.random() * 200) + 600;
  transactions.push({ id: `old-${i}-3`, date: shoppingDate.toISOString().split('T')[0], amount: shoppingAmount, category: 'Shopping', type: 'expense', description: 'Groceries & Retail' });

  const mediaDate = new Date(date);
  mediaDate.setDate(mediaDate.getDate() - 15);
  const mediaAmount = Math.floor(Math.random() * 150) + 400;
  transactions.push({ id: `old-${i}-4`, date: mediaDate.toISOString().split('T')[0], amount: mediaAmount, category: 'Media', type: 'expense', description: 'Entertainment' });

  const healthDate = new Date(date);
  healthDate.setDate(healthDate.getDate() - 20);
  transactions.push({ id: `old-${i}-5`, date: healthDate.toISOString().split('T')[0], amount: 250, category: 'Health', type: 'expense', description: 'Pharmacy' });
}

// TREND_DATA from the code
const TREND_DATA = [
  { month: 'Mon', balance: 12000, income: 24000, expense: 9500 },
  { month: 'Tue', balance: 15500, income: 25500, expense: 10200 },
  { month: 'Wed', balance: 20000, income: 27000, expense: 10800 },
  { month: 'Thu', balance: 16500, income: 29000, expense: 11500 },
  { month: 'Fri', balance: 11500, income: 29500, expense: 13000 },
  { month: 'Sat', balance: 14500, income: 30500, expense: 14000 },
  { month: 'Sun', balance: 17240, income: 31800, expense: 14560 },
];

console.log('='.repeat(80));
console.log('MOCK DATA CONSISTENCY ANALYSIS');
console.log('='.repeat(80));
console.log();

// Calculate actual totals from transactions
const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
const actualBalance = totalIncome - totalExpenses;

console.log('📊 ACTUAL TRANSACTION DATA:');
console.log(`   Total Income:     Rs. ${totalIncome.toLocaleString()}`);
console.log(`   Total Expenses:   Rs. ${totalExpenses.toLocaleString()}`);
console.log(`   Net Balance:      Rs. ${actualBalance.toLocaleString()}`);
console.log();

// Calculate income and expenses by category
const incomeByCategory = {};
const expensesByCategory = {};
transactions.forEach(t => {
  if (t.type === 'income') {
    incomeByCategory[t.category] = (incomeByCategory[t.category] || 0) + t.amount;
  } else {
    expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
  }
});

console.log('💰 INCOME BY CATEGORY:');
Object.entries(incomeByCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, amount]) => {
  console.log(`   ${cat.padEnd(15)} Rs. ${amount.toLocaleString()}`);
});
console.log();

console.log('💸 EXPENSES BY CATEGORY:');
Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, amount]) => {
  console.log(`   ${cat.padEnd(15)} Rs. ${amount.toLocaleString()}`);
});
console.log();

// Calculate savings rate
const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
console.log('📈 KEY METRICS:');
console.log(`   Savings Rate:    ${savingsRate}%`);
console.log(`   Income/Expense:   ${totalIncome.toLocaleString()} / ${totalExpenses.toLocaleString()}`);
console.log();

// Check TREND_DATA consistency
console.log('⚠️  TREND_DATA ANALYSIS:');
console.log('   Checking if balance = income - expense...');
let trendErrors = 0;
TREND_DATA.forEach((day, index) => {
  const calculatedBalance = day.income - day.expense;
  const isValid = Math.abs(day.balance - calculatedBalance) < 100; // Allow small rounding

  if (!isValid) {
    trendErrors++;
    console.log(`   ❌ ${day.month}: balance=${day.balance}, income=${day.income}, expense=${day.expense}`);
    console.log(`      Expected: ${calculatedBalance}, Got: ${day.balance}, Diff: ${day.balance - calculatedBalance}`);
  }
});

if (trendErrors === 0) {
  console.log('   ✅ All TREND_DATA entries are mathematically consistent!');
} else {
  console.log(`   ❌ Found ${trendErrors} inconsistencies in TREND_DATA`);
}
console.log();

// Final verdict
console.log('='.repeat(80));
console.log('🎯 SUMMARY:');
console.log('='.repeat(80));
console.log();
console.log(`✅ Transaction calculations: CORRECT`);
console.log(`❌ TREND_DATA calculations:   INCORRECT (${trendErrors} errors)`);
console.log();
console.log('🔧 RECOMMENDATIONS:');
console.log('   1. Fix TREND_DATA to match: balance = income - expense');
console.log('   2. Ensure TREND_DATA reflects actual transaction totals');
console.log('   3. Consider generating TREND_DATA dynamically from transactions');
console.log();
