'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { COLORS } from '@/lib/constants';

// 월별 트렌드 데이터 (최근 6개월)
const monthlyData = [
  { month: '8월', 발굴: 42, 연결완료: 35, 긴급: 3, 주의: 8 },
  { month: '9월', 발굴: 48, 연결완료: 41, 긴급: 4, 주의: 10 },
  { month: '10월', 발굴: 53, 연결완료: 45, 긴급: 2, 주의: 9 },
  { month: '11월', 발굴: 45, 연결완료: 40, 긴급: 3, 주의: 7 },
  { month: '12월', 발굴: 51, 연결완료: 48, 긴급: 3, 주의: 8 },
  { month: '1월', 발굴: 51, 연결완료: 43, 긴급: 3, 주의: 8 },
];

export function MonthlyTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">월별 발굴 추이</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
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
              />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
                iconSize={8}
              />
              <Line
                type="monotone"
                dataKey="발굴"
                stroke={COLORS.primary}
                strokeWidth={2}
                dot={{ r: 4, fill: COLORS.primary }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="연결완료"
                stroke={COLORS.risk.normal}
                strokeWidth={2}
                dot={{ r: 4, fill: COLORS.risk.normal }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="긴급"
                stroke={COLORS.risk.critical}
                strokeWidth={2}
                dot={{ r: 4, fill: COLORS.risk.critical }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
