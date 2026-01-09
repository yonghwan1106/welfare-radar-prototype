'use client';

import { FileQuestion, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

type EmptyStateType = 'search' | 'data' | 'households';

interface EmptyStateProps {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  className?: string;
  action?: React.ReactNode;
}

const icons = {
  search: Search,
  data: FileQuestion,
  households: Users,
};

const defaults = {
  search: {
    title: '검색 결과가 없습니다',
    description: '다른 검색어로 시도해보세요',
  },
  data: {
    title: '데이터가 없습니다',
    description: '아직 등록된 데이터가 없습니다',
  },
  households: {
    title: '가구 정보가 없습니다',
    description: '조건에 맞는 가구가 없습니다',
  },
};

export function EmptyState({
  type = 'data',
  title,
  description,
  className,
  action,
}: EmptyStateProps) {
  const Icon = icons[type];
  const defaultContent = defaults[type];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="mb-4 rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-1 text-lg font-medium text-foreground">
        {title || defaultContent.title}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {description || defaultContent.description}
      </p>
      {action}
    </div>
  );
}
