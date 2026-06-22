# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies (required before first run)
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview production build
```

There are no tests in this project.

## Architecture

React 19 + Vite app with no routing, no state management library, and no backend. The app is split into four components:

| Component | File | Owns |
|---|---|---|
| `App` | `src/App.jsx` | `transactions` state, `handleAdd`, top-level layout |
| `Summary` | `src/Summary.jsx` | Computes and displays income/expense/balance totals |
| `TransactionForm` | `src/TransactionForm.jsx` | Form field state, submit logic, calls `onAdd` prop |
| `TransactionList` | `src/TransactionList.jsx` | Filter state, filtering logic, transactions table |

**Data flow**: `transactions` lives in `App` and flows down as props. `TransactionForm` receives `onAdd` and calls it with a new transaction object. `Summary` and `TransactionList` each receive the full `transactions` array and derive what they need locally.

**`amount` field**: stored as a number (`parseFloat` applied on form submit). Seed data in `App.jsx` also uses numeric amounts.

**`categories`**: defined as a local constant in both `TransactionForm` and `TransactionList` — `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Styling**: plain CSS in `src/App.css` (no CSS framework). Key classes: `.income-amount` (green), `.expense-amount` (red), `.balance-amount`, `.summary-card`, `.delete-btn` (styled but not yet wired up).

**Known intentional issue** (this is a course starter):
- "Freelance Work" seed entry has `type: "expense"` but `category: "salary"` — data inconsistency left from the original starter
- No delete functionality (`.delete-btn` CSS exists but no button rendered)
