'use client';

import { LayoutGrid, List, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchInput } from '@/components/shared';
import { useHouseholdStore } from '@/stores';
import { dongList } from '@/lib/mock-data';
import { RISK_LABELS, STATUS_LABELS, HOUSEHOLD_TYPE_LABELS } from '@/lib/constants';
import type { RiskLevel, HouseholdStatus, HouseholdType } from '@/types';

export function HouseholdFilters() {
  const {
    filters,
    setFilters,
    resetFilters,
    viewMode,
    setViewMode,
  } = useHouseholdStore();

  return (
    <div className="space-y-4">
      {/* 검색 및 뷰 전환 */}
      <div className="flex items-center gap-4">
        <SearchInput
          value={filters.search || ''}
          onChange={(value) => setFilters({ search: value })}
          placeholder="이름, 주소, 키워드로 검색..."
          className="flex-1 max-w-md"
        />

        <div className="flex items-center gap-1 rounded-lg border p-1">
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('table')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('card')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 필터 옵션 */}
      <div className="flex flex-wrap items-center gap-3">
        {/* 위기등급 */}
        <Select
          value={filters.riskLevel || 'all'}
          onValueChange={(value) =>
            setFilters({
              riskLevel: value === 'all' ? undefined : (value as RiskLevel),
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="위기등급" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 등급</SelectItem>
            {Object.entries(RISK_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 처리상태 */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) =>
            setFilters({
              status: value === 'all' ? undefined : (value as HouseholdStatus),
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="처리상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 가구유형 */}
        <Select
          value={filters.householdType || 'all'}
          onValueChange={(value) =>
            setFilters({
              householdType: value === 'all' ? undefined : (value as HouseholdType),
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="가구유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            {Object.entries(HOUSEHOLD_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 동 */}
        <Select
          value={filters.dong || 'all'}
          onValueChange={(value) =>
            setFilters({
              dong: value === 'all' ? undefined : value,
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="동" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 지역</SelectItem>
            {dongList.map((dong) => (
              <SelectItem key={dong} value={dong}>
                {dong}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* 초기화 버튼 */}
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
    </div>
  );
}
