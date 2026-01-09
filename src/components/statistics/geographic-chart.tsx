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
import { households, dongList } from '@/lib/mock-data/households';
import { COLORS } from '@/lib/constants';

export function GeographicChart() {
  // 동별 가구 수 집계
  const dongStats = dongList.map((dong) => {
    const dongHouseholds = households.filter((h) => h.address.dong === dong);
    const critical = dongHouseholds.filter((h) => h.riskLevel === 'critical').length;
    const warning = dongHouseholds.filter((h) => h.riskLevel === 'warning').length;
    const attention = dongHouseholds.filter((h) => h.riskLevel === 'attention').length;
    const normal = dongHouseholds.filter((h) => h.riskLevel === 'normal').length;

    return {
      dong,
      total: dongHouseholds.length,
      critical,
      warning,
      attention,
      normal,
      riskRate: dongHouseholds.length > 0
        ? Math.round(((critical + warning) / dongHouseholds.length) * 100)
        : 0,
    };
  }).sort((a, b) => b.total - a.total);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">동별 위기가구 분포</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dongStats}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis
                type="category"
                dataKey="dong"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={{ stroke: '#E5E7EB' }}
                width={50}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value, name) => {
                  if (name === 'total') return [`${value}가구`, '총 가구'];
                  return [value, name];
                }}
              />
              <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                {dongStats.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.riskRate >= 30
                        ? COLORS.risk.critical
                        : entry.riskRate >= 20
                        ? COLORS.risk.warning
                        : entry.riskRate >= 10
                        ? COLORS.risk.attention
                        : COLORS.primary
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.risk.critical }} />
            <span>고위험(30%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.risk.warning }} />
            <span>위험(20%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.risk.attention }} />
            <span>관심(10%+)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS.primary }} />
            <span>일반</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
