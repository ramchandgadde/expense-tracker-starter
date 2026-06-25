import { useState } from 'react'
import ConfirmDialog from './ConfirmDialog'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

export default function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  const handleConfirmDelete = () => {
    onDelete(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <div className="transactions">
      {pendingDeleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this transaction?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}
      <h2>Transactions</h2>
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}${t.amount}
              </td>
              <td>
                <button className="delete-btn" onClick={() => setPendingDeleteId(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
