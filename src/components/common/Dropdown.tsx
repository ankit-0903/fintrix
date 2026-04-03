import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label: string;
  options: string[] | DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  className,
  icon,
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLabel = (opt: string | DropdownOption) => 
    typeof opt === 'string' ? opt : opt.label;
  
  const getValue = (opt: string | DropdownOption) => 
    typeof opt === 'string' ? opt : opt.value;

  const selectedOption = options.find(opt => getValue(opt) === value);
  const displayValue = selectedOption ? getLabel(selectedOption) : label;

  return (
    <div className={cn("relative", className)} ref={containerRef} id={id}>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-content-muted uppercase tracking-tighter ml-1">
          {label}
        </label>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex items-center justify-between gap-3 px-4 py-2.5 bg-surface border rounded-xl transition-all outline-none min-w-[140px] cursor-pointer w-full",
            isOpen 
              ? "border-primary/50 ring-4 ring-primary/5 shadow-sm" 
              : "border-border hover:border-primary/30"
          )}
        >
          <div className="flex items-center gap-2.5 truncate text-left">
            {icon && <div className="text-content-muted shrink-0">{icon}</div>}
            <span className="text-[11px] font-black uppercase tracking-widest text-content truncate">
              {displayValue}
            </span>
          </div>
          <ChevronDown className={cn(
            "w-3 h-3 text-content-muted shrink-0 transition-transform duration-300",
            isOpen && "rotate-180 text-primary"
          )} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 mt-2 p-2 bg-surface-card border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar flex flex-col gap-1">
              {options.map((opt) => {
                const optValue = getValue(opt);
                const optLabel = getLabel(opt);
                const isActive = optValue === value;

                return (
                  <button
                    key={optValue}
                    type="button"
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all text-left cursor-pointer",
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-content-muted hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    <span>{optLabel}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
