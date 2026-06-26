import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'

const COLORS = {
  food: '#FF6B6B',
  housing: '#4ECDC4',
  utilities: '#45B7D1',
  transport: '#FFA07A',
  entertainment: '#98D8C8',
  salary: '#7EC8E3',
  other: '#B8B8B8',
}

export default function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {})

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }))

  if (data.length === 0) {
    return null
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <XAxis dataKey="name" tick={{ fontSize: 10, fontFamily: "'Courier Prime', monospace", fill: '#6B5F54', letterSpacing: 1 }} axisLine={{ stroke: '#C4B89A' }} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 10, fontFamily: "'Courier Prime', monospace", fill: '#6B5F54' }} width={48} axisLine={false} tickLine={false} />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={{ fontFamily: "'Courier Prime', monospace", fontSize: 12, border: '1px solid #C4B89A', borderRadius: 0, background: '#FAFAF6' }}
            itemStyle={{ color: '#1A1A1A' }}
            labelStyle={{ color: '#6B5F54', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
