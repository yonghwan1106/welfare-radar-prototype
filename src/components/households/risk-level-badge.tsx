'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { RISK_LABELS } from '@/lib/constants';
import type { RiskLevel } from '@/types';

interface RiskLevelBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: 'text-xs px-1.5 py-0',
  md: 'text-xs px-2 py-0.5',
  lg: 'text-sm px-2.5 py-1',
};

const levelStyles: Record<RiskLevel, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-100',
  warning: 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100',
  attention: 'bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
  normal: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-100',
};

const dotStyles: Record<RiskLevel, string> = {
  critical: 'bg-red-500',
  warning: 'bg-orange-500',
  attention: 'bg-yellow-500',
  normal: 'bg-green-500',
};

export function RiskLevelBadge({
  level,
  size = 'md',
  showDot = false,
  className,
}: RiskLevelBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'font-medium',
        sizeStyles[size],
        levelStyles[level],
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            'mr-1.5 inline-block h-2 w-2 rounded-full',
            dotStyles[level]
          )}
        />
      )}
      {RISK_LABELS[level]}
    </Badge>
  );
}
