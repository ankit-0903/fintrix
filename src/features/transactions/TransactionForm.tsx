import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { X, Plus, IndianRupee, Tag, Calendar, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TransactionType } from '../../types';
import { Dropdown } from '../../components/common/Dropdown';
import { useTransactionForm } from '../../hooks/useTransactionForm';

export const TransactionForm: React.FC = () => {
  const { role, addTransaction, categories } = useDashboard();
  const {
    isOpen,
    formData,
    setFormData,
    openForm,
    closeForm,
    handleSubmit,
    handleDateChange
  } = useTransactionForm({
    onSuccess: (tx) => addTransaction(tx),
    defaultCategory: categories[0]
  });

  if (role !== 'admin') return null;

  return (
    <>
      <button
        onClick={openForm}
        className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Plus className="w-5 h-5" />
        Add Transaction
      </button>

      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface/80 backdrop-blur-sm cursor-default"
            onClick={closeForm}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-surface-card border border-border rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-content leading-tight">New Transaction</h2>
                  <p className="text-xs text-content-muted font-medium">Record a new financial entry</p>
                </div>
                <button
                  onClick={closeForm}
                  className="p-1.5 hover:bg-surface rounded-lg transition-colors text-content-muted hover:text-content"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2 block">Description</label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                    <input
                      type="text"
                      required
                      placeholder="What was this for?"
                      className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-content placeholder:text-content-muted"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2 block">Amount</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                      <input
                        type="number"
                        required
                        step="0.01"
                        placeholder="0.00"
                        className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-content placeholder:text-content-muted"
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Dropdown
                      label="Type"
                      value={formData.type}
                      onChange={(val: string) => setFormData({ ...formData, type: val as TransactionType })}
                      options={[
                        { value: 'expense', label: 'Expense' },
                        { value: 'income', label: 'Income' }
                      ]}
                      icon={<Type className="w-4 h-4" />}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Dropdown
                      label="Category"
                      value={formData.category}
                      onChange={(val: string) => setFormData({ ...formData, category: val })}
                      options={categories}
                      icon={<Tag className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-content-muted uppercase tracking-widest mb-2 block ml-1">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
                      <input
                        type="text"
                        required
                        maxLength={10}
                        placeholder="YYYY-MM-DD"
                        className="w-full bg-surface border border-border rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-content placeholder:text-content-muted"
                        value={formData.date}
                        onChange={e => handleDateChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 mt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 px-4 py-3 bg-surface hover:bg-border text-content rounded-xl font-bold transition-all border border-border active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
