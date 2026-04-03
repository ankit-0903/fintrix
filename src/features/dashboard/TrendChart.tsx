import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TREND_DATA } from '../../constants/mockData';
import { CURRENCY } from '../../constants/config';
import { motion } from 'framer-motion';

interface TooltipEntry {
  name: string;
  value: number | string;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-card border border-border p-4 rounded-xl shadow-lg backdrop-blur-md min-w-[150px]">
        <p className="text-[11px] font-bold text-content-muted uppercase tracking-widest mb-3 border-b border-border pb-2">{label}</p>
        <div className="flex flex-col gap-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-medium text-content capitalize">{entry.name === 'balance' ? 'Balance' : 'Expense'}</span>
              </div>
              <span className="text-sm font-bold text-content whitespace-nowrap">{CURRENCY} {Number(entry.value).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const TrendChart: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-surface-card backdrop-blur-xl border border-border rounded-2xl shadow-sm p-6 h-[480px] flex flex-col gap-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg text-content leading-tight">Balance Trend</h3>
          <p className="text-xs text-content-muted mt-1">Weekly liquidity & expense tracking</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest text-content-muted mt-0.5">
          Last 7 Days
        </div>
      </div>

      <div className="flex-1 w-full min-h-[300px] mt-4">
        <ResponsiveContainer width="99%" height="100%">
          <LineChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis
              dataKey="month"
              stroke="var(--content-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              style={{ fontWeight: 'bold' }}
              dy={10}
            />
            <YAxis
              stroke="var(--content-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}`}
              style={{ fontWeight: 'bold' }}
              ticks={[0, 6000, 12000, 18000, 24000]}
              domain={[0, 24000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-color)', strokeWidth: 1, strokeDasharray: '4 4' }} />

            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#3b82f6' }}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: '#fff', strokeWidth: 2, stroke: '#10b981' }}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>

        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
