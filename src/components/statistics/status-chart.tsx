'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { households, householdStats } from '@/lib/mock-data/households';
import { STATUS_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const STATUS_COLORS: Record<string, { bg: string; bar: string }> = {
  unprocessed: { bg: 'bg-red-100', bar: 'bg-red-500' },
  in_progress: { bg: 'bg-yellow-100', bar: 'bg-yellow-500' },
  completed: { bg: 'bg-green-100', bar: 'bg-green-500' },
  monitoring: { bg: 'bg-blue-100', bar: 'bg-blue-500' },
};

export function StatusChart() {
  const total = householdStats.total;
  const statuses = ['unprocessed', 'in_progress', 'completed', 'monitoring'] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">처리 현황</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statuses.map((status) => {
          const count = householdStats.byStatus[status];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const colors = STATUS_COLORS[status];

          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{STATUS_LABELS[status]}</span>
                <span className="font-medium">
                  {count}건 ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className={cn('h-2.5 rounded-full', colors.bg)}>
                <div
                  className={cn('h-full rounded-full transition-all', colors.bar)}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* 처리율 요약 */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">전체 처리율</span>
            <span className="text-lg font-bold text-green-600">
              {total > 0
                ? (
                    ((householdStats.byStatus.completed + householdStats.byStatus.monitoring) /
                      total) *
                    100
                  ).toFixed(1)
                : 0}
              %
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            완료 + 모니터링 기준
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
