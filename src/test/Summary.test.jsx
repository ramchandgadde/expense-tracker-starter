import { render, screen } from '@testing-library/react'
import Summary from '../Summary'

const transactions = [
  { id: 1, description: 'Salary', amount: 5000, type: 'income', category: 'salary', date: '2025-01-01' },
  { id: 2, description: 'Rent',   amount: 1200, type: 'expense', category: 'housing', date: '2025-01-02' },
]

test('displays income total', () => {
  render(<Summary transactions={transactions} />)
  expect(screen.getByText(/\$5,000\.00/)).toBeInTheDocument()
})

test('displays expense total', () => {
  render(<Summary transactions={transactions} />)
  expect(screen.getByText(/\$1,200\.00/)).toBeInTheDocument()
})

test('displays correct balance', () => {
  render(<Summary transactions={transactions} />)
  expect(screen.getByText(/\$3,800\.00/)).toBeInTheDocument()
})
