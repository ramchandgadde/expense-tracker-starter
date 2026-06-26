const fmt = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary" role="region" aria-label="Financial summary">
      <div className="summary-card summary-card--income" role="region" aria-label="Total income">
        <p className="summary-card__label">Income</p>
        <p className="summary-card__amount" aria-live="polite">{fmt(totalIncome)}</p>
      </div>
      <div className="summary-card summary-card--expense" role="region" aria-label="Total expenses">
        <p className="summary-card__label">Expenses</p>
        <p className="summary-card__amount" aria-live="polite">{fmt(totalExpenses)}</p>
      </div>
      <div
        className={`summary-card summary-card--balance ${balance >= 0 ? 'is-positive' : 'is-negative'}`}
        role="region"
        aria-label="Current balance"
      >
        <p className="summary-card__label">Balance</p>
        <p className="summary-card__amount" aria-live="polite">{fmt(balance)}</p>
      </div>
    </div>
  );
}
