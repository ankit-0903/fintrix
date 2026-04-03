import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { DashboardProvider } from './context/DashboardContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { LoadingFallback } from './components/common/LoadingFallback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <ThemeProvider>
          <DashboardProvider>
            <App />
          </DashboardProvider>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);
