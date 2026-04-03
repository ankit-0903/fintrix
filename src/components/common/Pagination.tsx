import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  onPageChange
}) => {
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalCount);

  const handlePrevious = () => {
    onPageChange(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-surface/30 border-t border-border">
      <div className="text-[11px] font-black text-content-muted uppercase tracking-widest">
        Showing <span className="text-content">{from}</span> to <span className="text-content">{to}</span> of <span className="text-content">{totalCount}</span> transactions
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-border bg-surface text-content-muted hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:text-content-muted disabled:hover:border-border transition-all cursor-pointer active:scale-90"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = currentPage === page;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-xl text-[12px] font-black transition-all cursor-pointer active:scale-90",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-content-muted hover:bg-primary/5 hover:text-primary"
                )}
                aria-label={`Go to page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-border bg-surface text-content-muted hover:text-primary hover:border-primary/50 disabled:opacity-30 disabled:hover:text-content-muted disabled:hover:border-border transition-all cursor-pointer active:scale-90"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
