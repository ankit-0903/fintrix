# <p align="center">📈 Fintrix Dashboard</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/Vitest-Ready-729B1B?logo=vitest" alt="Vitest" />
</p>

<p align="center">
  <strong>A high-fidelity personal finance dashboard built to demonstrate frontend development capabilities through clean architecture, intuitive UI design, and effective state management.</strong>
</p>

---

## 🎯 Requirement Mapping

| Criterion | How It's Addressed |
|:---|:---|
| **Design & Creativity** | Premium "High-Depth" aesthetic with glassmorphism effects; subtle gradient animations; consistent indigo-based color scheme; thoughtful micro-interactions on hover and transitions |
| **Responsiveness** | Mobile-friendly sidebar with smooth toggle; flexible grid layouts that stack on smaller screens; touch-optimized interactions; tested across viewports |
| **Functionality** | All CRUD operations working; role switching immediately affects UI permissions; filters and search update in real-time; forms validate before submission |
| **User Experience** | Intuitive navigation; visual feedback for all actions; empty states guide users; loading indicators prevent confusion; consistent layout patterns |
| **Technical Quality** | Modular component structure; separation of concerns (UI/logic/data); TypeScript for type safety; custom hooks for reusability; proper prop typing |
| **State Management** | Unified context provider prevents prop drilling; custom hooks encapsulate business logic; localStorage persists changes; role state controls UI behavior |
| **Documentation** | Comprehensive README with requirement mapping; CLAUDE.md for project context; inline comments for complex logic; clear file organization |
| **Attention to Detail** | Error boundaries catch crashes; form validation prevents invalid data; date formatting uses locale conventions; currency formatting matches Indian Rupee locale |

## ✅ Core Requirements

| Requirement | Implementation Detail |
| :--- | :--- |
| **1. Dashboard Overview** | Summary cards (Balance, Income, Expenses) with trend indicators; time-based balance trend chart; categorical spending breakdown chart |
| **2. Transactions Section** | Full historical record with Date, Amount, Category, and Type; real-time search, multi-field filtering, and column-based sorting |
| **3. Role-Based UI** | Simulated RBAC with Viewer (read-only) and Admin (full CRUD); role switcher in header immediately updates UI permissions |
| **4. Insights & Observations** | **Top Category Identification**; Savings rate calculation; **Data Observation**: Identify year-end projections and trend movements |
| **5. State Management** | Context API with `DashboardProvider`; unified state for transactions, filters, and user roles; persistent localStorage sync |
| **6. UI/UX Quality** | Responsive design; mobile-friendly sidebar; **Empty State handling** (illustrations/feedback); Global Error Boundary |

### 🎯 Optional Enhancements

- **Dark Mode** - High-contrast theme toggle with smooth transitions and persistent preference
- **Data Persistence** - Automated localStorage integration with fallback to localized mock data
- **Animations** - Framer Motion micro-interactions and page transitions throughout
- **Professional Exports** - Filter-aware **Excel (.xlsx)** and branded **PDF** reporting (via SheetJS & jsPDF)
- **Advanced Filtering** - Multi-field filtering including date ranges and categorical exclusion
- **Pre-commit Quality Gates** - Automated linting and testing via Husky + lint-staged

## 🚀 Quick Start

Ensure you have **Node.js 18+** installed.

```bash
# 1. Clone & Navigate
git clone https://github.com/ankit-0903/fintrix.git
cd fintrix

# 2. Install Dependencies
npm install

# 3. Launch Development Server
npm run dev

# 4. Open the URL shown in your terminal
# (Typically http://localhost:5173)
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run coverage` - Generate test coverage report

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/) - Modern, fast development experience
- **State Management**: Context API - Lightweight, built-in solution perfect for this scale
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) - Utility-first approach for rapid, consistent UI development
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Smooth, declarative animations
- **Charts**: [Recharts](https://recharts.org/) - Flexible charting library built on D3
- **Testing**: [Vitest](https://vitest.dev/) - Fast unit testing framework
- **Icons**: [Lucide React](https://lucide.dev/) - Consistent, modern icon set
- **Date Handling**: [date-fns](https://date-fns.org/) - Lightweight date manipulation
- **Automation**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) - Pre-commit quality gates

## 📁 Repository Structure

```
fintrix/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components (ErrorBoundary, EmptyState, DataCard, Pagination, Dropdown)
│   │   └── layout/          # Layout components (Header, Sidebar)
│   ├── features/
│   │   ├── dashboard/       # Dashboard-specific views (StatsGrid, TrendChart, SpendChart, InsightsPanel)
│   │   └── transactions/    # Transaction features (TransactionTable, FilterBar, TransactionForm, SortableHeader)
│   ├── context/             # State management (AuthContext, TransactionContext, UIContext, DashboardProvider)
│   ├── hooks/               # Custom hooks (useFinancialStats, useFilteredTransactions, useTransactionForm)
│   ├── services/            # External services (storageService for localStorage)
│   ├── lib/                 # Utility functions and tests
│   ├── constants/           # Configuration (categories, currency, chart colors)
│   ├── types/               # TypeScript type definitions
│   └── pages/               # Page-level components (Dashboard, Transactions)
├── .husky/                  # Git hooks for automated quality checks
├── public/                  # Static assets
└── vite.config.ts           # Vite and Vitest configuration
```

## 💡 Approach & Design Decisions

### State Management Strategy
I chose **Context API** over Redux/Zustand because:
- Application scale is moderate - no need for external dependencies
- State updates are localized to transactions, auth, and UI preferences
- Built-in React API reduces bundle size and complexity
- Single `useDashboard()` hook provides clean, unified access to all state

### Intuitive Design Philosophy
Adhering to the assignment's goal for an "Intuitive" experience, Fintrix employs a high-contrast, high-depth minimalist aesthetic. The layout is designed to prioritize data legibility—using vertical lists for transactions and expansive charts for trends—ensuring users understand their finances with zero cognitive load.

### Component Architecture
- **Feature-based organization**: Components grouped by domain (dashboard/transactions) rather than type
- **Reusable common components**: ErrorBoundary, EmptyState, DataCard used across features
- **Custom hooks for logic**: Business logic extracted into testable hooks (`useFinancialStats`, `useFilteredTransactions`)
- **Type safety**: Full TypeScript coverage with shared types in `types/index.ts`

### Data Flow
1. **Storage Layer**: `storageService` handles localStorage operations with mock data fallback
2. **Context Layer**: `TransactionContext` manages state and CRUD operations
3. **Logic Layer**: Custom hooks compute derived state (stats, filtered data)
4. **View Layer**: Components consume hooks via contexts for rendering

### UI/UX Considerations
- **Accessibility**: Proper semantic HTML, ARIA labels, keyboard navigation
- **Responsive Design**: Mobile-first with collapsible sidebar and flexible grids
- **Performance**: `useMemo` for expensive calculations, `useCallback` for event handlers
- **Error Handling**: Global Error Boundary catches and displays errors gracefully
- **Empty States**: Dedicated EmptyState component for better UX when no data exists
- **Loading States**: LoadingFallback component during data fetches



## 🧪 Testing the Application

### Role-Based Access Control Demo
1. Start the app and notice the default "Viewer" role in the header dropdown
2. **As Viewer**: Navigate to Transactions page - you can view, search, and filter but cannot add/edit/delete
3. **Switch to Admin**: Use the role dropdown in the header to change to "Admin"
4. **As Admin**: The "Add Transaction" button becomes available, and edit/delete actions appear on each transaction row

### Data Persistence
- All transactions automatically save to localStorage
- Refresh the page - your data persists
- Clear browser localStorage to reset to mock data

### Testing Features
- **Dashboard**: View summary cards, hover over chart tooltips, observe trend indicators
- **Transactions**: Try search by description, filter by category/type, sort by columns
- **Export**: Click the Excel or PDF button to download branded reports
- **Dark Mode**: Toggle theme in header to see smooth transitions
- **Responsiveness**: Resize browser window or use DevTools device emulation

---

<p align="center">
  <strong>Project Engineering Standards</strong><br />
  Modular Architecture • Type-Safe Logic • Performance Optimized
</p>

<p align="center">
  Built with using <strong>React 19</strong>, <strong>Vite</strong>, and <strong>Tailwind CSS</strong>
</p>

