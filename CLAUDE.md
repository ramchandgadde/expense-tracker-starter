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

This is a single-component React app (Vite + React 19). All application logic lives in `src/App.jsx` — there are no sub-components, no routing, no state management library, and no backend.

**State** (all in `App` via `useState`):
- `transactions` — array of `{ id, description, amount, type, category, date }`. `amount` is stored as a **string**, which causes the summary totals to concatenate instead of sum (known bug in the starter).
- Form fields: `description`, `amount`, `type`, `category`
- Filter fields: `filterType`, `filterCategory`

**Data flow**: transactions are filtered inline during render (no memoization). Summary totals (`totalIncome`, `totalExpenses`, `balance`) are also computed inline each render.

**Styling**: plain CSS in `src/App.css` (no CSS framework). Key classes: `.income-amount` (green), `.expense-amount` (red), `.balance-amount`, `.summary-card`, `.delete-btn` (styled but not yet wired up).

**Known intentional issues** (this is a course starter):
- `amount` stored as string → `reduce` concatenates instead of adding
- "Freelance Work" is categorized as `income` in the data but its `type` is set to `"expense"`
- No delete functionality (`.delete-btn` CSS exists but no button rendered)
