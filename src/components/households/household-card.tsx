'use client';

import { useRouter } from 'next/navigation';
import { MapPin, User, Home } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RiskLevelBadge } from './risk-level-badge';
import { QuickActions } from './quick-actions';
import { STATUS_LABELS, DIMENSION_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { Household, HouseholdStatus, RiskDimensionKey } from '@/types';

interface HouseholdCardProps {
  household: Household;
}

const statusStyles: Record<HouseholdStatus, string> = {
  unprocessed: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  monitoring: 'bg-purple-100 text-purple-700',
};

const dimensionColors: Record<RiskDimensionKey, string> = {
  economic: 'bg-blue-500',
  health: 'bg-red-500',
  isolation: 'bg-purple-500',
  housing: 'bg-orange-500',
  family: 'bg-pink-500',
  administrative: 'bg-cyan-500',
};

const riskBorderStyles: Record<string, string> = {
  critical: 'border-l-4 border-l-red-500',
  warning: 'border-l-4 border-l-orange-500',
  attention: 'border-l-4 border-l-yellow-500',
  normal: 'border-l-4 border-l-green-500',
};

export function HouseholdCard({ household }: HouseholdCardProps) {
  const router = useRouter();

  const handleViewDetail = () => {
    router.push(`/households/${household.id}`);
  };

  // 가장 높은 위험 차원 찾기
  const dimensions = household.riskDimensions;
  const topDimensions = Object.entries(dimensions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <Card
      className={cn(
        'cursor-pointer transition-shadow hover:shadow-md',
        riskBorderStyles[household.riskLevel]
      )}
      onClick={handleViewDetail}
    >
      <CardContent className="pt-4">
        {/* 상단: 이름, 등급, 상태 */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{household.name}</h3>
              <RiskLevelBadge level={household.riskLevel} size="sm" />
            </div>
            <Badge
              variant="secondary"
              className={cn('text-xs', statusStyles[household.status])}
            >
              {STATUS_LABELS[household.status]}
            </Badge>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <QuickActions
              householdId={household.id}
              householdName={household.name}
              compact
              onViewDetail={handleViewDetail}
            />
          </div>
        </div>

        {/* 기본 정보 */}
        <div className="space-y-1.5 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{household.age}세 · {household.householdType}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{household.address.district} {household.address.dong}</span>
          </div>
        </div>

        {/* 위기 점수 */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">위기 점수</span>
            <span className="text-sm font-semibold">{household.riskScore}/100</span>
          </div>
          <Progress value={household.riskScore} className="h-2" />
        </div>

        {/* 상위 위험 차원 */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">주요 위험 요소</span>
          <div className="space-y-1.5">
            {topDimensions.map(([key, value]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs">
                      {DIMENSION_LABELS[key as RiskDimensionKey]}
                    </span>
                    <span className="text-xs text-muted-foreground">{value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn('h-full rounded-full', dimensionColors[key as RiskDimensionKey])}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI 요약 (짧게) */}
        {household.aiSummary && (
          <p className="mt-3 text-xs text-muted-foreground line-clamp-2 pt-3 border-t">
            {household.aiSummary}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
