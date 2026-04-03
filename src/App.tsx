import { useState, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'transactions'>('dashboard');

  const handleNavigate = useCallback((page: 'dashboard' | 'transactions') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <ErrorBoundary>
      <div className="flex bg-surface text-content font-sans min-h-screen transition-colors duration-300">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 w-full relative">
          {/* Background Gradients */}
          <div className="fixed top-0 right-0 -z-10 w-full h-full overflow-hidden pointer-events-none fade-in">
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
          </div>
          
          {currentPage === 'dashboard' ? (
            <Dashboard onNavigate={handleNavigate} />
          ) : (
            <Transactions />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
