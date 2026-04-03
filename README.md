# <p align="center">📈 Fintrix Dashboard</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/Vitest-Ready-729B1B?logo=vitest" alt="Vitest" />
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License" />
</p>

<p align="center">
  <strong>A high-fidelity personal finance dashboard characterized by an enterprise-grade "High-Depth" minimalist aesthetic, built for performance and professional clarity.</strong>
</p>

---

## ✨ Features

Fintrix is designed to provide actionable financial insights with zero cognitive load.

| Feature | Description |
| :--- | :--- |
| **📊 Real-time Analytics** | Dynamic summary cards for Balance, Income, and Expenses with trend indicators. |
| **🎨 High-Depth UI** | Premium Indigo-First aesthetic with glassmorphism and subtle micro-animations. |
| **⚙️ Smart Filtering** | Search and filter transactions by category, type, and date range in real-time. |
| **🛠️ Admin Control** | Comprehensive Transaction Management (Add/Edit/Delete) with localized currency (Rs.). |
| **🛡️ Resilience Layer** | Integrated Global Error Boundary and professional Empty State handling. |
| **✅ Quality Gates** | Husky & lint-staged pre-commit hooks ensure stable, lint-clean code. |

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
```

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **State Management**: [Context API](https://react.dev/learn/passing-data-deeply-with-context) (Lightweight & Efficient)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Automation**: [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)

## 📁 Repository Structure

```
fintrix/
├── src/
│   ├── components/common/   # Reusable UI (Cards, ErrorBoundary, EmptyState)
│   ├── features/dashboard/  # Specialized Charts and Stats views
│   ├── features/transactions/# Tables, Sortable Headers, and Forms
│   ├── context/             # Unified State (DashboardContext)
│   ├── hooks/               # Core Logic (Calculations, Filtering)
│   └── constants/           # Branding (Currency, Locales, Colors)
├── .husky/                  # Pre-commit quality hooks
├── public/                  # Static assets (Favicons, Logo)
└── vite.config.ts           # Vitest and Build configuration
```

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

<p align="center"><i>"Building the future of personal finance management."</i></p>
