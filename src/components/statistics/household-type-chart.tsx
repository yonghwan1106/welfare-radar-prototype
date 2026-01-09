'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { households } from '@/lib/mock-data/households';
import { HOUSEHOLD_TYPE_LABELS } from '@/lib/constants';
import type { HouseholdType } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  '1인': '#3B82F6',
  '부부': '#10B981',
  '한부모': '#F59E0B',
  '다자녀': '#8B5CF6',
  '다문화': '#EC4899',
  '조손': '#EF4444',
  '기타': '#6B7280',
};

export function HouseholdTypeChart() {
  // 가구 유형별 집계
  const typeCountMap = new Map<HouseholdType, number>();
  households.forEach((h) => {
    const count = typeCountMap.get(h.householdType) || 0;
    typeCountMap.set(h.householdType, count + 1);
  });

  const typeData = Array.from(typeCountMap.entries())
    .map(([type, count]) => ({
      name: HOUSEHOLD_TYPE_LABELS[type] || type,
      value: count,
      type,
    }))
    .sort((a, b) => b.value - a.value);

  const total = households.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">가구 유형별 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={{ stroke: '#9CA3AF', strokeWidth: 1 }}
              >
                {typeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={TYPE_COLORS[entry.type] || '#6B7280'}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => {
                  const numValue = Number(value) || 0;
                  return [
                    `${numValue}가구 (${((numValue / total) * 100).toFixed(1)}%)`,
                    '',
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
          {typeData.slice(0, 4).map((item) => (
            <div key={item.type} className="flex items-center gap-1.5">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: TYPE_COLORS[item.type] }}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
