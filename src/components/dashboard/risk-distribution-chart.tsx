'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COLORS, RISK_LABELS } from '@/lib/constants';
import type { RiskLevel } from '@/types';

interface RiskDistributionData {
  level: RiskLevel;
  count: number;
}

interface RiskDistributionChartProps {
  data: RiskDistributionData[];
}

const CHART_COLORS: Record<RiskLevel, string> = {
  critical: COLORS.risk.critical,
  warning: COLORS.risk.warning,
  attention: COLORS.risk.attention,
  normal: COLORS.risk.normal,
};

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const chartData = data.map((item) => ({
    name: RISK_LABELS[item.level],
    value: item.count,
    level: item.level,
  }));

  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">위기등급 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.level}
                    fill={CHART_COLORS[entry.level]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  const numValue = Number(value) || 0;
                  return [
                    `${numValue}가구 (${((numValue / total) * 100).toFixed(1)}%)`,
                    ''
                  ];
                }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 상세 수치 */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map((item) => (
            <div
              key={item.level}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[item.level] }}
                />
                <span className="text-sm">{RISK_LABELS[item.level]}</span>
              </div>
              <span className="font-medium">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
