import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <div className="absolute w-6 h-6 bg-primary/20 rounded-full animate-pulse" />
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-bold text-content animate-pulse">Fintrix</h3>
        <p className="text-sm text-content-muted">Initializing dashboard...</p>
      </div>
    </div>
  );
};
