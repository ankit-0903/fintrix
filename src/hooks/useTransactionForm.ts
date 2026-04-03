import { useState, useCallback } from 'react';
import type { FormEvent } from 'react';
import type { TransactionType } from '../types';

export interface TransactionFormData {
  description: string;
  amount: string;
  category: string;
  type: TransactionType;
  date: string;
}

interface UseTransactionFormProps {
  onSuccess: (tx: {
    description: string;
    amount: number;
    category: string;
    type: TransactionType;
    date: string;
  }) => void;
  defaultCategory: string;
}

export const useTransactionForm = ({ onSuccess, defaultCategory }: UseTransactionFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<TransactionFormData>({
    description: '',
    amount: '',
    category: defaultCategory,
    type: 'expense' as TransactionType,
    date: new Date().toISOString().split('T')[0]
  });

  const resetForm = useCallback(() => {
    setFormData({
      description: '',
      amount: '',
      category: defaultCategory,
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  }, [defaultCategory]);

  const openForm = useCallback(() => setIsOpen(true), []);
  const closeForm = useCallback(() => {
    setIsOpen(false);
    resetForm();
  }, [resetForm]);

  const handleDateChange = useCallback((value: string) => {
    let val = value.replace(/[^0-9]/g, '');
    if (val.length > 4) {
      val = val.slice(0, 4) + '-' + val.slice(4);
    }
    if (val.length > 7) {
      val = val.slice(0, 7) + '-' + val.slice(7);
    }
    setFormData(prev => ({ ...prev, date: val.slice(0, 10) }));
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    onSuccess({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date
    });

    closeForm();
  }, [formData, onSuccess, closeForm]);

  return {
    isOpen,
    formData,
    setFormData,
    openForm,
    closeForm,
    handleSubmit,
    handleDateChange
  };
};
