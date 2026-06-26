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

React 19 + Vite app with no routing, no state management library, and no backend. The app is split into six components:

| Component | File | Owns |
|---|---|---|
| `App` | `src/App.jsx` | `transactions` state, `handleAdd`, `handleDelete`, top-level layout |
| `Summary` | `src/Summary.jsx` | Computes and displays income/expense/balance totals |
| `TransactionForm` | `src/TransactionForm.jsx` | Form field state, submit logic, calls `onAdd` prop |
| `TransactionList` | `src/TransactionList.jsx` | Filter state, filtering logic, transactions table, delete trigger |
| `ConfirmDialog` | `src/ConfirmDialog.jsx` | Accessible modal dialog for delete confirmation |
| `SpendingChart` | `src/SpendingChart.jsx` | Recharts bar chart of expenses grouped by category |

**Data flow**: `transactions` lives in `App` and flows down as props. `TransactionForm` receives `onAdd` and calls it with a new transaction object. `Summary`, `TransactionList`, and `SpendingChart` each receive the full `transactions` array and derive what they need locally. `TransactionList` receives `onDelete` and triggers it after confirmation via `ConfirmDialog`.

**`amount` field**: stored as a number (`parseFloat` applied on form submit). Seed data in `App.jsx` also uses numeric amounts. Display uses `Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })` — defined as a local `fmt()` helper in `Summary.jsx` and `TransactionList.jsx`.

**`categories`**: defined as a local constant in both `TransactionForm` and `TransactionList` — `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**Styling**: plain CSS in `src/index.css` (design tokens) + `src/App.css` (all component styles). No CSS framework.

- Design tokens are CSS custom properties on `:root` in `index.css`: `--color-*`, `--font-mono` (DM Mono), `--font-sans` (Inter), `--radius-*`, `--shadow-*`.
- Shared card surface applied via grouped selector: `.summary-card, .spending-chart, .add-transaction, .transactions { background/border/radius/shadow }`.
- Key layout classes: `.summary` (CSS grid, 3 cols), `.form-grid` (CSS grid, 5 cols on desktop / 2 cols on mobile).
- Amount values use `--font-mono` (DM Mono) for a ledger-like precision feel.
- Category chips: `.category-chip` + `.chip--{category}` modifier — each category has a distinct background/text color pair.
- Balance card uses `.is-positive` / `.is-negative` modifier class for colored left border and amount color.
- `.sr-only` utility class defined in `index.css` for screen-reader-only content.

**ARIA**: All form inputs have explicit `<label htmlFor>` elements. Summary cards use `role="region"`. Delete buttons have `aria-label="Delete transaction: [description]"`. `ConfirmDialog` uses `role="dialog"`, `aria-modal`, `aria-labelledby`, `autoFocus` on Cancel, and Escape key dismissal. Transaction table has `<caption className="sr-only">`. Filter selects have `sr-only` labels.

**SpendingChart colors** (match category chip palette):
`food: #D97706, housing: #7C3AED, utilities: #2563EB, transport: #059669, entertainment: #DB2777, salary: #CA8A04, other: #6B7280`

**Known intentional issue** (this is a course starter):
- "Freelance Work" seed entry has `type: "expense"` but `category: "salary"` — data inconsistency left from the original starter
