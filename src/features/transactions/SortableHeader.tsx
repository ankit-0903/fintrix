import React from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { SortField, SortDirection } from '../../types';

interface SortableHeaderProps {
  label: string;
  field: SortField;
  currentSortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
  className?: string;
  align?: 'left' | 'right' | 'center';
}

export const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  field,
  currentSortField,
  sortDirection,
  onSort,
  className,
  align = 'left'
}) => {
  const isActive = currentSortField === field;

  return (
    <th
      className={cn(
        "px-6 py-5 align-middle cursor-pointer hover:bg-white/10 transition-colors select-none group/header",
        align === 'right' && "text-right",
        align === 'center' && "text-center",
        className
      )}
      onClick={() => onSort(field)}
    >
      <div className={cn(
        "flex items-center gap-2 h-full",
        align === 'right' && "justify-end",
        align === 'center' && "justify-center"
      )}>
        {label}
        <div className={cn(
          "transition-all duration-200",
          isActive ? "text-white opacity-100" : "text-white/20 opacity-40 group-hover/header:opacity-100"
        )}>
          {isActive ? (
            sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
          ) : (
            <ArrowUpDown className="w-3.5 h-3.5" />
          )}
        </div>
      </div>
    </th>
  );
};
