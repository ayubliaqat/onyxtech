'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#3D7FFF', '#5DCAA5', '#EF9F27', '#AFA9EC', '#F0997B']

export const CategoryDonut = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))
  const total = chartData.reduce((sum, d) => sum + d.value, 0)

  return (
    <div>
      <div style={{ width: '100%', height: 160 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              stroke="#111A2E"
              strokeWidth={3}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#111A2E',
                border: '0.5px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
              }}
              labelStyle={{ color: '#FFFFFF' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="onyx-legend">
        {chartData.map((d, index) => (
          <span key={d.name} className="onyx-legend__item">
            <span
              className="onyx-legend__dot"
              style={{ background: COLORS[index % COLORS.length] }}
            />
            {d.name} {total ? Math.round((d.value / total) * 100) : 0}%
          </span>
        ))}
      </div>
    </div>
  )
}
