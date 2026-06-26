import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = {
  food:          '#D97706',
  housing:       '#7C3AED',
  utilities:     '#2563EB',
  transport:     '#059669',
  entertainment: '#DB2777',
  salary:        '#CA8A04',
  other:         '#6B7280',
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div className="spending-chart">
      <h2 className="section-title">Spending by category</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <XAxis
            dataKey="name"
            tickFormatter={capitalize}
            tick={{ fontSize: 12, fontFamily: "'Inter', sans-serif", fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fontSize: 12, fontFamily: "'DM Mono', monospace", fill: '#6B7280' }}
            width={58}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
            contentStyle={{
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
            }}
            cursor={{ fill: 'rgba(0,0,0,0.04)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || COLORS.other} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
