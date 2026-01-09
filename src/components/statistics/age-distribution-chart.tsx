'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { households } from '@/lib/mock-data/households';
import { COLORS } from '@/lib/constants';

// 연령대 구간 정의
const ageGroups = [
  { label: '30대', min: 30, max: 39 },
  { label: '40대', min: 40, max: 49 },
  { label: '50대', min: 50, max: 59 },
  { label: '60대', min: 60, max: 69 },
  { label: '70대', min: 70, max: 79 },
  { label: '80대+', min: 80, max: 999 },
];

export function AgeDistributionChart() {
  // 연령대별 집계
  const ageData = ageGroups.map((group) => {
    const groupHouseholds = households.filter(
      (h) => h.age >= group.min && h.age <= group.max
    );
    const highRisk = groupHouseholds.filter(
      (h) => h.riskLevel === 'critical' || h.riskLevel === 'warning'
    ).length;

    return {
      label: group.label,
      total: groupHouseholds.length,
      highRisk,
      riskRate: groupHouseholds.length > 0
        ? Math.round((highRisk / groupHouseholds.length) * 100)
        : 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">연령대별 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  if (name === 'total') return [`${value}가구`, '전체'];
                  if (name === 'highRisk') return [`${value}가구`, '고위험'];
                  return [value, name];
                }}
              />
              <Bar dataKey="total" fill={COLORS.primary} radius={[4, 4, 0, 0]} name="total" />
              <Bar dataKey="highRisk" fill={COLORS.risk.critical} radius={[4, 4, 0, 0]} name="highRisk" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded" style={{ backgroundColor: COLORS.primary }} />
            <span className="text-muted-foreground">전체 가구</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded" style={{ backgroundColor: COLORS.risk.critical }} />
            <span className="text-muted-foreground">고위험(긴급+주의)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
