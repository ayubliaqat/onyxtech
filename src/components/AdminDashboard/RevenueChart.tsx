'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

export const RevenueChart = ({ data }: { data: Record<string, number> }) => {
  const chartData = Object.entries(data).map(([day, revenue]) => ({ day, revenue }))

  return (
    <div style={{ width: '100%', height: 180 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="day" stroke="#8B94A7" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#8B94A7" fontSize={11} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: '#111A2E',
              border: '0.5px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
            }}
            labelStyle={{ color: '#FFFFFF' }}
            itemStyle={{ color: '#3D7FFF' }}
          />
          <Line type="monotone" dataKey="revenue" stroke="#3D7FFF" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
