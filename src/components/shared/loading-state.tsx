'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  );
}

interface LoadingStateProps {
  type?: 'card' | 'table' | 'list';
  count?: number;
  className?: string;
}

export function LoadingState({
  type = 'card',
  count = 3,
  className,
}: LoadingStateProps) {
  if (type === 'table') {
    return (
      <div className={cn('space-y-3', className)}>
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: count }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-primary" />
    </div>
  );
}
