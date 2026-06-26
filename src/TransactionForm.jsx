import { useState } from 'react'

const categories = ['food', 'housing', 'utilities', 'transport', 'entertainment', 'salary', 'other'];

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription('');
    setAmount('');
    setType('expense');
    setCategory('food');
  };

  return (
    <div className="add-transaction">
      <h2 id="form-heading" className="section-title">Add transaction</h2>
      <form
        className="form-grid"
        onSubmit={handleSubmit}
        aria-labelledby="form-heading"
      >
        <div className="form-field form-field--desc">
          <label htmlFor="tx-description" className="form-label">Description</label>
          <input
            id="tx-description"
            className="form-input"
            type="text"
            placeholder="e.g. Coffee, Rent, Paycheck"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="tx-amount" className="form-label">Amount ($)</label>
          <input
            id="tx-amount"
            className="form-input"
            type="number"
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="tx-type" className="form-label">Type</label>
          <select
            id="tx-type"
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="tx-category" className="form-label">Category</label>
          <select
            id="tx-category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{capitalize(cat)}</option>
            ))}
          </select>
        </div>

        <div className="form-field form-field--submit">
          <button type="submit" className="form-submit-btn">Add transaction</button>
        </div>
      </form>
    </div>
  );
}
