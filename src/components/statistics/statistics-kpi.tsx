'use client';

import { Card, CardContent } from '@/components/ui/card';
import { households, householdStats } from '@/lib/mock-data/households';
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
}

function KpiCard({ title, value, subtitle, trend, icon, className }: KpiCardProps) {
  return (
    <Card className={className}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <div className={cn(
                'flex items-center gap-1 text-xs font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {trend.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>전월 대비 {Math.abs(trend.value)}%</span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-lg bg-muted">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatisticsKpi() {
  // 평균 위기 점수 계산
  const avgRiskScore = households.length > 0
    ? Math.round(households.reduce((sum, h) => sum + h.riskScore, 0) / households.length)
    : 0;

  // 고위험 가구 비율
  const highRiskRate = householdStats.total > 0
    ? (
        ((householdStats.byRiskLevel.critical + householdStats.byRiskLevel.warning) /
          householdStats.total) *
        100
      ).toFixed(1)
    : '0';

  // 처리율
  const processingRate = householdStats.total > 0
    ? (
        ((householdStats.byStatus.completed + householdStats.byStatus.monitoring) /
          householdStats.total) *
        100
      ).toFixed(1)
    : '0';

  // 미처리 건수
  const unprocessedCount = householdStats.byStatus.unprocessed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="관리 가구 수"
        value={`${householdStats.total}가구`}
        subtitle="전체 모니터링 대상"
        trend={{ value: 5.2, isPositive: true }}
        icon={<Users className="h-5 w-5 text-primary" />}
      />
      <KpiCard
        title="고위험 가구 비율"
        value={`${highRiskRate}%`}
        subtitle={`긴급 ${householdStats.byRiskLevel.critical} + 주의 ${householdStats.byRiskLevel.warning}`}
        trend={{ value: 2.1, isPositive: false }}
        icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
      />
      <KpiCard
        title="처리 완료율"
        value={`${processingRate}%`}
        subtitle="완료 + 모니터링 기준"
        trend={{ value: 8.5, isPositive: true }}
        icon={<CheckCircle className="h-5 w-5 text-green-500" />}
      />
      <KpiCard
        title="미처리 건수"
        value={`${unprocessedCount}건`}
        subtitle="즉각 대응 필요"
        icon={<Clock className="h-5 w-5 text-red-500" />}
        className={unprocessedCount > 10 ? 'border-red-200 bg-red-50/50' : ''}
      />
    </div>
  );
}
