'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DIMENSION_LABELS, COLORS } from '@/lib/constants';
import type { RiskDimensions, RiskDimensionKey } from '@/types';

interface RiskRadarChartProps {
  dimensions: RiskDimensions;
  title?: string;
}

const dimensionColorMap: Record<RiskDimensionKey, string> = {
  economic: COLORS.dimensions.economic,
  health: COLORS.dimensions.health,
  isolation: COLORS.dimensions.isolation,
  housing: COLORS.dimensions.housing,
  family: COLORS.dimensions.family,
  administrative: COLORS.dimensions.administrative,
};

export function RiskRadarChart({ dimensions, title = '6차원 위기 분석' }: RiskRadarChartProps) {
  const chartData = Object.entries(dimensions).map(([key, value]) => ({
    dimension: DIMENSION_LABELS[key as RiskDimensionKey],
    value,
    fullMark: 100,
    key,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#9ca3af', fontSize: 10 }}
              />
              <Radar
                name="위기 점수"
                dataKey="value"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 각 차원별 상세 점수 */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {chartData.map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-lg border px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: dimensionColorMap[item.key as RiskDimensionKey] }}
                />
                <span className="text-sm">{item.dimension}</span>
              </div>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
