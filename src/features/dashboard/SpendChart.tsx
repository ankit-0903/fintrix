import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '../../context/DashboardContext';
import { useFinancialStats } from '../../hooks/useFinancialStats';
import { CURRENCY } from '../../constants/config';
import { motion } from 'framer-motion';
import { EmptyState } from '../../components/common/EmptyState';
import { PieChart as PieChartIcon } from 'lucide-react';

interface PieLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
  name?: string;
  fill?: string;
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, fill }: PieLabelProps) => {
  if (cx === undefined || cy === undefined || midAngle === undefined || innerRadius === undefined || outerRadius === undefined || percent === undefined) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.02) return null;
  return (
    <text x={x} y={y} fill={fill} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11} fontWeight="bold">
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export const SpendChart: React.FC = () => {
  const { transactions } = useDashboard();
  const { categoryData } = useFinancialStats(transactions);
  const hasData = categoryData.length > 0 && categoryData.some(d => d.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-surface-card backdrop-blur-xl border border-border rounded-2xl shadow-sm p-6 flex flex-col relative h-[480px]"
    >
      <div>
        <h3 className="font-bold text-lg text-content leading-tight">Spending Breakdown</h3>
        <p className="text-xs text-content-muted mt-1">Current month category breakdown</p>
      </div>

      {!hasData ? (
        <EmptyState
          variant="chart"
          icon={PieChartIcon}
          title="No spending data"
          description="Start adding transactions to see your spending breakdown."
          className="flex-1"
        />
      ) : (
        <>
          <div className="flex-1 w-full mt-2 flex flex-col justify-center">
            <ResponsiveContainer width="99%" height="100%">
              <PieChart margin={{ top: 20, right: 60, bottom: 20, left: 60 }} style={{ outline: 'none' }} className="focus:outline-none">
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={false}
                  isAnimationActive={true}
                  style={{ outline: 'none' }}
                  className="focus:outline-none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="var(--surface-card)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: 'var(--content)', fontWeight: 'bold' }}
                  formatter={(value: string | number | readonly (string | number)[] | undefined) => {
                    const val = Array.isArray(value) ? value[0] : value;
                    return val ? `${CURRENCY} ${Number(val).toLocaleString()}` : '';
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4 pt-4 border-t border-border w-full">
            {categoryData.map((entry, index) => (
              <div key={`item-${index}`} className="flex items-center justify-between col-span-1 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span className="text-[11px] font-bold text-content whitespace-nowrap">{entry.name}</span>
                </div>
                <span className="text-[11px] font-medium text-content whitespace-nowrap">{CURRENCY} {entry.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};
