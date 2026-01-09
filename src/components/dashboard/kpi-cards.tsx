'use client';

import { AlertTriangle, Users, CheckCircle, Clock, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  variant?: 'default' | 'critical' | 'warning' | 'success';
  index?: number;
}

const variantConfig = {
  default: {
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    iconShadow: 'shadow-blue-500/30',
    border: 'border-blue-100',
    hover: 'hover:border-blue-200',
  },
  critical: {
    iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
    iconShadow: 'shadow-red-500/30',
    border: 'border-red-100',
    hover: 'hover:border-red-200',
  },
  warning: {
    iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    iconShadow: 'shadow-orange-500/30',
    border: 'border-orange-100',
    hover: 'hover:border-orange-200',
  },
  success: {
    iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    iconShadow: 'shadow-green-500/30',
    border: 'border-green-100',
    hover: 'hover:border-green-200',
  },
};

function KPICard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = 'default',
  index = 0,
}: KPICardProps) {
  const config = variantConfig[variant];
  const isPositiveChange = change !== undefined && change > 0;
  const isNegativeChange = change !== undefined && change < 0;

  return (
    <Card
      className={cn(
        'relative overflow-hidden border-2 transition-all duration-300 hover-lift',
        config.border,
        config.hover,
        'animate-fade-in-up opacity-0'
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      {/* 배경 패턴 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-muted/30" />
      <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full bg-muted/20" />

      <CardContent className="relative pt-6 pb-5">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold tracking-tight counter">{value}</p>
            </div>
            {change !== undefined && (
              <div className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                isPositiveChange && variant === 'critical'
                  ? 'bg-red-100 text-red-700'
                  : isNegativeChange && variant === 'critical'
                  ? 'bg-green-100 text-green-700'
                  : isPositiveChange
                  ? 'bg-green-100 text-green-700'
                  : isNegativeChange
                  ? 'bg-red-100 text-red-700'
                  : 'bg-muted text-muted-foreground'
              )}>
                {isPositiveChange ? (
                  <TrendingUp className="h-3 w-3" />
                ) : isNegativeChange ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                {change > 0 ? '+' : ''}{change}%
                <span className="text-xs opacity-80">{changeLabel}</span>
              </div>
            )}
          </div>
          <div className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg',
            config.iconBg,
            config.iconShadow
          )}>
            <Icon className="h-7 w-7 text-white" />
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
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <KPICard key={kpi.title} {...kpi} index={index} />
      ))}
    </div>
  );
}
