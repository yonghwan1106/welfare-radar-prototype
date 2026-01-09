'use client';

import { AlertTriangle, Users, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  variant?: 'default' | 'critical' | 'warning' | 'success';
}

const variantStyles = {
  default: 'bg-primary/10 text-primary',
  critical: 'bg-red-100 text-red-600',
  warning: 'bg-orange-100 text-orange-600',
  success: 'bg-green-100 text-green-600',
};

function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = 'default',
}: KPICardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            {change !== undefined && (
              <p className={cn(
                'mt-1 text-xs',
                change > 0 ? 'text-red-600' : change < 0 ? 'text-green-600' : 'text-muted-foreground'
              )}>
                {change > 0 ? '+' : ''}{change}% {changeLabel}
              </p>
            )}
          </div>
          <div className={cn('rounded-lg p-3', variantStyles[variant])}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface KPICardsProps {
  data: {
    totalHouseholds: number;
    criticalCount: number;
    inProgressCount: number;
    completedToday: number;
  };
}

export function KPICards({ data }: KPICardsProps) {
  const kpis = [
    {
      title: '전체 관리 가구',
      value: data.totalHouseholds.toLocaleString(),
      change: 3,
      changeLabel: '전월 대비',
      icon: Users,
      variant: 'default' as const,
    },
    {
      title: '긴급 대응 필요',
      value: data.criticalCount,
      change: -12,
      changeLabel: '전주 대비',
      icon: AlertTriangle,
      variant: 'critical' as const,
    },
    {
      title: '처리 진행 중',
      value: data.inProgressCount,
      icon: Clock,
      variant: 'warning' as const,
    },
    {
      title: '오늘 처리 완료',
      value: data.completedToday,
      icon: CheckCircle,
      variant: 'success' as const,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <KPICard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
