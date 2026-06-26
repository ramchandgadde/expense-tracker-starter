import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

const fmt = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

export default function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filtered = transactions;
  if (filterType !== 'all') {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== 'all') {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  const pendingTransaction = transactions.find(t => t.id === pendingDeleteId);

  const handleConfirmDelete = () => {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="transactions">
      {pendingDeleteId && (
        <ConfirmDialog
          message={`"${pendingTransaction?.description}" will be permanently removed.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      <div className="transactions-header">
        <h2 className="section-title">Transactions</h2>
        <div className="filters" role="group" aria-label="Filter transactions">
          <label htmlFor="filter-type" className="sr-only">Filter by type</label>
          <select
            id="filter-type"
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <label htmlFor="filter-category" className="sr-only">Filter by category</label>
          <select
            id="filter-category"
            className="filter-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found</p>
          <p>Try adjusting the filters or add a new transaction above.</p>
        </div>
      ) : (
        <table className="transactions-table">
          <caption className="sr-only">Transaction history</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id}>
                <td><span className="tx-date">{t.date}</span></td>
                <td>{t.description}</td>
                <td>
                  <span className={`category-chip chip--${t.category}`}>
                    {t.category}
                  </span>
                </td>
                <td>
                  <span className={`tx-amount tx-amount--${t.type}`}>
                    {t.type === 'income' ? '+' : '−'}{fmt(t.amount)}
                  </span>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    aria-label={`Delete transaction: ${t.description}`}
                    onClick={() => setPendingDeleteId(t.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
