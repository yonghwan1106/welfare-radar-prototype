'use client';

import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchInput } from '@/components/shared';
import { useServiceStore } from '@/stores';
import { SERVICE_CATEGORY_LABELS } from '@/lib/constants';
import type { ServiceCategory } from '@/types';

const categories: Array<{ value: ServiceCategory | 'all'; label: string }> = [
  { value: 'all', label: '전체' },
  { value: '생활지원', label: SERVICE_CATEGORY_LABELS['생활지원'] },
  { value: '의료', label: SERVICE_CATEGORY_LABELS['의료'] },
  { value: '주거', label: SERVICE_CATEGORY_LABELS['주거'] },
  { value: '고용', label: SERVICE_CATEGORY_LABELS['고용'] },
  { value: '교육', label: SERVICE_CATEGORY_LABELS['교육'] },
  { value: '돌봄', label: SERVICE_CATEGORY_LABELS['돌봄'] },
];

export function ServiceFilters() {
  const { filters, setFilters, resetFilters } = useServiceStore();

  return (
    <div className="space-y-4">
      {/* 검색 */}
      <div className="flex items-center gap-4">
        <SearchInput
          value={filters.search || ''}
          onChange={(value) => setFilters({ search: value })}
          placeholder="서비스명, 키워드로 검색..."
          className="flex-1 max-w-md"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-muted-foreground"
        >
          <RotateCcw className="mr-1 h-4 w-4" />
          초기화
        </Button>
      </div>

      {/* 카테고리 탭 */}
      <Tabs
        value={filters.category}
        onValueChange={(value) =>
          setFilters({ category: value as ServiceCategory | 'all' })
        }
      >
        <TabsList className="bg-muted/50 p-1">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="data-[state=active]:bg-white"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
