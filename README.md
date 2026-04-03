# Fintrix Finance Dashboard

A modern, clean, and responsive personal finance dashboard built with React, Tailwind CSS, and Recharts. Designed for 2026 with a premium "Dark-First" aesthetic.

## 🚀 Quick Start

1.  **Clone the workspace** and navigate to `fintrix`.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run locally**:
    ```bash
    npm run dev
    ```

## ✨ Key Features

- **Dashboard Overview**: Summary cards for Total Balance, Monthly Income, and Expenses with percentage indicators.
- **Interactive Visualizations**:
  - **Balance Trend**: Area chart showing history over the last 6 months.
  - **Spending Breakdown**: Donut chart showing categorical distribution.
- **Transaction Management**: 
  - Sortable and filterable table.
  - Category-based rapid filtering.
  - **Admin Role**: Full Add/Edit/Delete capabilities for transactions.
- **Smart Insights**: Derived metrics showing Savings Rate, Top Category, and Year-End projections.
- **Simulated Role-Based UI**: Instantly toggle between "Viewer" (Read-only) and "Admin" (Full access) via the header.
- **Responsive Design**: Mobile-optimized layout with a translucent "Glassmorphism" effect.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite + TypeScript.
- **Styling**: Tailwind CSS 4.0 (Modern CSS-first configuration).
- **Animations**: Framer Motion for smooth transitions and hover effects.
- **Icons**: Lucide React for premium, consistent iconography.
- **Charts**: Recharts for performance-oriented, responsive data viz.
- **State**: React Context API for lightweight, efficient state management.
- **Storage**: Local Storage persistence for transactions and user preferences.

## 🎨 Design Philosophy

- **Minimalism**: Reduced cognitive load by prioritizing the top 3 financial decisions.
- **Visual Hierarchy**: Clear distinction between high-level KPIs and granular transaction details.
- **Premium Aesthetics**: Using the "Fintrix Indigo" palette with deep slates and translucent blurs.

## 📂 Project Structure

```
fintrix/
├── src/
│   ├── components/
│   │   └── layout/         # Sidebar, Header
│   ├── context/            # DashboardContext (State)
│   ├── data/               # Mock data & Types
│   ├── features/
│   │   ├── dashboard/      # Stats & Charts
│   │   ├── transactions/   # Table & Forms
│   │   └── insights/       # Smart Cards
│   ├── pages/              # Dashboard entry page
│   └── App.tsx             # Main layout & Backgrounds
└── tailwind.config.ts      # (Using v4 CSS-first config)
```

---
*Built for the Finance Dashboard UI Assignment - 2026.*
