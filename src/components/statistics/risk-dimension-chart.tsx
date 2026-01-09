'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { households } from '@/lib/mock-data/households';
import { DIMENSION_LABELS, COLORS } from '@/lib/constants';
import type { RiskDimensionKey } from '@/types';

export function RiskDimensionChart() {
  // 전체 평균과 고위험 가구 평균 계산
  const dimensions: RiskDimensionKey[] = ['economic', 'health', 'isolation', 'housing', 'family', 'administrative'];

  const highRiskHouseholds = households.filter(
    (h) => h.riskLevel === 'critical' || h.riskLevel === 'warning'
  );
  const normalHouseholds = households.filter(
    (h) => h.riskLevel === 'attention' || h.riskLevel === 'normal'
  );

  const dimensionData = dimensions.map((dim) => {
    const highRiskAvg = highRiskHouseholds.length > 0
      ? Math.round(
          highRiskHouseholds.reduce((sum, h) => sum + h.riskDimensions[dim], 0) /
            highRiskHouseholds.length
        )
      : 0;

    const normalAvg = normalHouseholds.length > 0
      ? Math.round(
          normalHouseholds.reduce((sum, h) => sum + h.riskDimensions[dim], 0) /
            normalHouseholds.length
        )
      : 0;

    return {
      dimension: DIMENSION_LABELS[dim],
      고위험: highRiskAvg,
      일반: normalAvg,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">6차원 위기 지표 비교</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dimensionData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 11, fill: '#6B7280' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#9CA3AF' }}
              />
              <Radar
                name="고위험 평균"
                dataKey="고위험"
                stroke={COLORS.risk.critical}
                fill={COLORS.risk.critical}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="일반 평균"
                dataKey="일반"
                stroke={COLORS.risk.normal}
                fill={COLORS.risk.normal}
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${value}점`, '']}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
                iconSize={8}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
